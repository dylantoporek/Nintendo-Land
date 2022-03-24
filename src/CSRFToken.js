// function getCSRFToken() {
//     return unescape(document.cookie.split("=")[1]);
//    }
    
//    export const postConfig = (data) => ({
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "X-CSRF-Token": getCSRFToken(),
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//    });
    
//    export const getConfig = () => ({
//     credentials: "include",
//     headers: { "X-CSRF-Token": getCSRFToken() },
//    });
    
//    export const deleteConfig = () => ({
//     method: "DELETE",
//     credentials: "include",
//     headers: { "X-CSRF-Token": getCSRFToken() },
//    });
    
//    export const patchConfig = (data) => ({
//     method: "PATCH",
//     credentials: "include",
//     headers: {
//       "X-CSRF-Token": getCSRFToken(),
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//    });
    
//    export default getCSRFToken;