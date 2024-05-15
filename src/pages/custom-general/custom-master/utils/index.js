export function extractInnerText(htmlString) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlString;
  return tempElement.innerText;
}

export function removeDuplicatesAndKeepHighestVersion(array) {
  const projectsMap = array.reduce((map, obj) => {
    const { projectCode, version } = obj;
    if (!map.has(projectCode) || version > map.get(projectCode).version) {
      map.set(projectCode, obj);
    }
    return map;
  }, new Map());
  
  return Array.from(projectsMap.values());
}

export function isObjectEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // If it has any own property, it's not empty
    }
  }
  return true; // If no own properties found, object is empty
}
