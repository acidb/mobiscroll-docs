/**
 * Checks if another framework version exists from a document
 * @param activeDocContext
 * @param currentFramework
 * @param otherFramework
 * @returns The docId of the other version or null if it does not exists
 */
export function getOtherFrameworkDocID(activeDocContext, currentFramework, otherFramework) {
  if (!activeDocContext.activeDoc || !currentFramework || !otherFramework)
    return null;
  const currentID = activeDocContext.activeDoc.id;
  const otherID = currentID.replace(currentFramework, otherFramework);
  if (currentID !== otherID && isValidID(otherID, activeDocContext.activeVersion.docs)) {
    return otherID;
  }
  return null;
}

/**
 * Searches for the existence of a docId
 * @param id docId
 * @param allDocs an array of doc context objects
 * @returns
 */
function isValidID(id, allDocs) {
  const item = allDocs.find(i => i.id === id);
  return !!item;
}