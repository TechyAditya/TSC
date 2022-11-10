// import { projectStorage, storage } from '../firebase/config'
// import { ref } from "vue"
// import getUser from "./getUser"

// const { user } = getUser()

// console.log("Storage Debugging")

// getDownloadURL(ref(storage, 'test/peakpx.jpg'))
//     .then((url) => {
//         // `url` is the download URL for 'images/stars.jpg'

//         // This can be downloaded directly:
//         // const xhr = new XMLHttpRequest();
//         // xhr.responseType = 'blob';
//         // xhr.onload = (event) => {
//         //     const blob = xhr.response;
//         // };
//         // xhr.open('GET', url);
//         // xhr.send();

//         // Or inserted into an <img> element
//         const img = document.getElementById('myimg');
//         img.setAttribute('src', url);
//         img.setAttribute('alt', 'test image');
//     })
//     .catch((error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//             case 'storage/object-not-found':
//                 // File doesn't exist
//                 break;
//             case 'storage/unauthorized':
//                 // User doesn't have permission to access the object
//                 break;
//             case 'storage/canceled':
//                 // User canceled the upload
//                 break;

//             // ...

//             case 'storage/unknown':
//                 // Unknown error occurred, inspect the server response
//                 break;
//         }
//     });

// // const useStorage = () => {
// //     const error = ref(null)
// //     const url = ref(null)
// //     const filePath = ref(null)

// //     const uploadImage = async (file) => {
// //         filePath.value = `covers/${user.value.uid}/${file.name}`
// //         const storageRef = projectStorage.ref(filePath.value)

// //         try {
// //             const res = await storageRef.put(file)
// //             url.value = await res.ref.getDownloadURL()
// //         } catch (err) {
// //             console.log(err.message)
// //             error.value = err
// //         }
// //     }

// //     const deleteImage = async (path) => {
// //         const storageRef = projectStorage.ref(path);

// //         try {
// //             await storageRef.delete()
// //         } catch (err) {
// //             console.log(err.message)
// //             error.value = err
// //         }
// //     }

// //     return { uploadImage, deleteImage, url, filePath, error }
// // }

// export default useStorage;
var storage = firebase.storage();
var pathReference = storage.ref('test/peakpx.jpg');

// Create a reference from a Google Cloud Storage URI
// var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg'); 

// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!

pathReference.getDownloadURL()
    .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // // This can be downloaded directly:
        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = (event) => {
        //     var blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();

        // Or inserted into an <img> element
        var img = document.getElementById('myimg');
        img.setAttribute('src', url);
        img.setAttribute('alt', 'test image');
        img.setAttribute('width', '100%');
    })
    .catch((error) => {
        // Handle any errors
    });