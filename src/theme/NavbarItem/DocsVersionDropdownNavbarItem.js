import React from 'react';
import {
  useVersions,
  useActiveDocContext,
  useDocsVersionCandidates,
  useDocsPreferredVersion,
} from '@docusaurus/plugin-content-docs/client';
import { translate } from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import { compareVersionStringDesc, getSemVerInfo } from '@site/src/util/versioning';
import { getDefaultTags } from '@site/src/components/Search/searchLink';
import { LEGACY_V5_TAG, LEGACY_V5_VERSION } from '@site/src/components/Search/util';

const versionMap = require('../../../version-map.json');

const getVersionMainDoc = (version) =>
  version.docs.find((doc) => doc.id === version.mainDocId);
export default function DocsVersionDropdownNavbarItem({
  mobile,
  docsPluginId,
  dropdownActiveClassDisabled,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}) {
  const { pathname, search, hash } = useLocation();
  const activeDocContext = useActiveDocContext(docsPluginId);
  const versions = useVersions(docsPluginId);
  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);
  // The search results page (/search) carries no doc-route version context for
  // useActiveDocContext/useDocsVersionCandidates below to read, so they silently default to
  // the latest version even when the search itself was scoped from a v5.35.0 page.
  // SearchPage/index.js already tracks that via a `tag` URL param (see getDefaultTags in
  // searchLink.ts) — reuse that same signal here so the dropdown reflects where the search
  // actually came from, instead of always showing latest.
  const isLegacyV5SearchContext = pathname.endsWith('/search') && getDefaultTags().includes(LEGACY_V5_TAG);
  const legacyV5Version = isLegacyV5SearchContext ? versions.find((version) => version.name === LEGACY_V5_VERSION) : null;
  const latestGroups = groupVersions(versions);
  const versionLinks = versions.filter((version) => latestGroups[getGroup(version.label)][0] === version.label).map((version) => {
    // We try to link to the same doc, in another version
    // When not possible, fallback to the "main doc" of the version
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ??
      getVersionMainDoc(version);
    const label = mapVersion(versionMap, version.label);
    return {
      label: label,
      // preserve ?search#hash suffix on version switches
      to: `${versionDoc.path}${search}${hash}`,
      isActive: () => (legacyV5Version ? version === legacyV5Version : version === activeDocContext.activeVersion),
      onClick: () => savePreferredVersionName(version.name),
    };
  });
  const items = [
    ...dropdownItemsBefore,
    ...versionLinks,
    ...dropdownItemsAfter,
  ];
  // useDocsVersionCandidates must always be called (Rules of Hooks) even when its result
  // ends up unused below, so it's called unconditionally here rather than short-circuited
  // by `??` inline (which would skip the hook call whenever legacyV5Version is set).
  const defaultDropdownVersion = useDocsVersionCandidates(docsPluginId)[0];
  const dropdownVersion = legacyV5Version ?? defaultDropdownVersion;
  const dropdownVersionLabel = mapVersion(versionMap, dropdownVersion.label);
  // Mobile dropdown is handled a bit differently
  const dropdownLabel =
    mobile && items.length > 1
      ? translate({
        id: 'theme.navbar.mobileVersionsDropdown.label',
        message: 'Versions',
        description:
          'The label for the navbar versions dropdown on mobile view',
      })
      : dropdownVersionLabel;
  const dropdownTo =
    mobile && items.length > 1
      ? undefined
      : getVersionMainDoc(dropdownVersion).path;
  // We don't want to render a version dropdown with 0 or 1 item. If we build
  // the site with a single docs version (onlyIncludeVersions: ['1.0.0']),
  // We'd rather render a button instead of a dropdown
  if (items.length <= 1) {
    return (
      <DefaultNavbarItem
        {...props}
        mobile={mobile}
        label={dropdownLabel}
        to={dropdownTo}
        isActive={dropdownActiveClassDisabled ? () => false : undefined}
      />
    );
  }
  // console.log('items:', items);
  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={dropdownLabel}
      to={dropdownTo}
      items={items}
      isActive={dropdownActiveClassDisabled ? () => false : undefined}
    />
  );
}

function mapVersion(versionMap, version) {
  return (versionMap && versionMap[version]) ? versionMap[version] : version;
}

function groupVersions(versions) {
  const initialGroups = {};
  const groups = versions.reduce(reducer, initialGroups);
  for (const key in groups) {
    const list = groups[key];
    list.sort(compareVersionStringDesc)
  }
  return groups;

  function reducer(gr, version) {
    const key = getGroup(version.label);
    if (!gr[key]) {
      gr[key] = [];
    }
    gr[key].push(version.label);
    return gr;
  }
}


function getGroup(version) {
  const vInfo = getSemVerInfo(version);
  if (vInfo) {
    return vInfo.Major + '.' + vInfo.Minor;
  } else {
    return version;
  }
}
