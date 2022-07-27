import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getUserFromStorageAsync} from '../services/LocalStorage';

export const localStoragePhotos = sono => {
  const [SPhotos, setSPhotos] = React.useState([]);
  const storageFun = async () => {
    let photoArray = await getUserFromStorageAsync('mediaUrl' + sono);
    // console.log(photoArray);
    return photoArray;
  };
  React.useEffect(() => {
    storageFun().then(res => {
      //   console.log(res);
      //   return res;
      setSPhotos(res);
    });
  }, []);
  if (SPhotos != []) return SPhotos;
};

export const localStorageVideos = sono => {
  const [SVideos, setSVideos] = React.useState([]);
  const storageFun = async () => {
    let videoArray = await getUserFromStorageAsync('videoUrl' + sono);
    // console.log(photoArray);
    return videoArray;
  };
  React.useEffect(() => {
    storageFun().then(res => {
      //   console.log(res);
      //   return res;
      setSVideos(res);
    });
  }, []);
  if (SVideos != []) return SVideos;
};

// export const localStorageDocuments = () => {
//   const [SDocuments, setSDocuments] = React.useState([]);
//   const storageFun = async () => {
//     let DocumentArray = await getUserFromStorageAsync('DocumentUrl');
//     // console.log(photoArray);
//     return DocumentArray;
//   };
//   React.useEffect(() => {
//     storageFun().then(res => {
//       //   console.log(res);
//       //   return res;
//       setSDocuments(res);
//     });
//   }, []);
//   if (SDocuments != []) return SDocuments;
// };

// export default localStoragePhotos;
