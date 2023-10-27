

import makeApiCall from ".."

export async function getClasses(schoolID: any) {
    const response = await makeApiCall(`/api/v1/showSchoolClasses?school_id=${schoolID}`, 'get')
     return response.data
   } 