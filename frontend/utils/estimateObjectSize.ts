export default function estimateObjectSize(obj: any): number {
    const seenObjects = new WeakSet();
    
    function calculateSize(innerObj: any): number {
        if (typeof innerObj !== 'object' || innerObj === null) {
            return 0;
        }
        
        if (seenObjects.has(innerObj)) {
            return 0;
        }
        
        seenObjects.add(innerObj);
        
        let size = 0;
        for (const key in innerObj) {
            if (innerObj.hasOwnProperty(key)) {
                size += key.length * 2; // Assuming an average key length of 2 bytes
                size += calculateSize(innerObj[key]);
            }
        }
        
        return size;
    }
    
    const estimatedSizeBytes = calculateSize(obj);
    const estimatedSize = estimatedSizeBytes / 1024;

    return estimatedSize;
}