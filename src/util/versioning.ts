interface SemVerInfo {
    Major: number;
    Minor: number;
    Patch?: number;
    Label?: string;
}
export function compareVersionStringDesc(a: string, b: string) {
    return compareVersionString(b, a);
}

export function compareVersionString(a: string, b: string) {
    // case of next version
    const la = a.toLowerCase();
    const lb = b.toLowerCase();
    if (la === 'next' && b !== 'next') {
        return 1;
    } else if (lb === 'next' && la !== 'next') {
        return -1;
    } else if (la === 'next' && lb === 'next') {
        return 0;
    }

    // otherwise
    const versionReg = /^([0-9]+)\.([0-9]+)(?:\.(?:([0-9]+)(?:-([a-z]+[a-z0-9.]*))?)|(?:-([a-z]+[a-z0-9.]*)))?$/;
    const match1 = versionReg.exec(a);
    const match2 = versionReg.exec(b);
    if (match1 && match2) {
        const v1: SemVerInfo = {
            Major: parseInt(match1[1]),
            Minor: parseInt(match1[2])
        };
        const v2: SemVerInfo = {
            Major: parseInt(match2[1]),
            Minor: parseInt(match2[2])
        };
        if (match1[3]) {
            v1.Patch = parseInt(match1[3]);
        }
        if (match2[3]) {
            v2.Patch = parseInt(match2[3]);
        }
        if (match1[4] || match1[5]) {
            v1.Label = match1[4] ? match1[4] : match1[5];
        }
        if (match2[4] || match2[5]) {
            v2.Label = match2[4] ? match2[4] : match2[5];
        }
        return compareVersionObject(v1, v2);
    }
}

function compareVersionObject(v1: SemVerInfo, v2: SemVerInfo) {
    if (v1.Major > v2.Major) {
        return 1;
    } else if (v1.Major < v2.Major) {
        return -1;
    } else if (v1.Minor > v2.Minor) {
        return 1;
    } else if (v1.Minor < v2.Minor) {
        return -1;
    } else {
        if (v1.Patch !== undefined || v2.Patch !== undefined) {
            var v1p = v1.Patch === undefined ? 0 : v1.Patch;
            var v2p = v2.Patch === undefined ? 0 : v2.Patch;
            if (v1p > v2p) {
                return 1;
            } else if (v1p < v2p) {
                return -1;
            }
        }
        if (v1.Label !== undefined && v2.Label !== undefined) {
            if (v1.Label > v2.Label) {
                return 1;
            } else if (v1.Label < v2.Label) {
                return -1;
            } else {
                return 0;
            }
        } else if (v1.Label !== undefined && v2.Label === undefined) {
            return -1;
        } else if (v1.Label === undefined && v2.Label !== undefined) {
            return 1;
        }
    }
    return 0;
}