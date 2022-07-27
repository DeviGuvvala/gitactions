import {View, Text} from 'react-native';
import React from 'react';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {BASE_URL, TWILIO_URL} from '@env';

export const loginAsync = async (username, password, presentDate) => {
  try {
    const res = await RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        BASE_URL + `/validate_user/${username}/${password}?clientCode=9pack`,
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      )
      .then(resp => resp.json())
      .then(resJson => {
        console.log(resJson);
        return resJson;
      })
      .catch(err => {
        console.log(err);
      });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getworkordersasync = async (user, presentDate) => {
  try {
    const res = await RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        BASE_URL +
          `/technician/${user}/service_orders?technicianCode=${user}&technicianPin=${user}&appToken=9Pack&service_date=${presentDate}`,
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      )
      .then(resp => resp.json())
      .then(resJson => {
        console.log(resJson);
        return resJson;
      })
      .catch(err => {
        console.log(err);
      });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const workorderDetailsasync = async (user, sono, custNo) => {
  try {
    const res = await RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        BASE_URL +
          `/technician/${user}/service_orders/${sono}?technicianCode=124&technicianPin=124&customer_id=${custNo}&service_order_id=${sono}`,
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      )
      .then(resp => resp.json())
      .then(resJson => {
        console.log(resJson);
        return resJson;
      })
      .catch(err => {
        console.log(err);
      });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addNotesasync = async (user, inpObj) => {
  const res = await axios({
    method: 'POST',
    url: BASE_URL + `/appAdministration/${user}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: inpObj,
  });
  console.log(res);
  return res.data;
};

export const addEquipasync = async (user, inpObj) => {
  const res = await axios({
    method: 'POST',
    url: BASE_URL + `/appAdministration/${user}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: inpObj,
  });
  console.log(res);
  return res.data;
};

export const equipmentTypeAsync = async user => {
  const res = await axios({
    method: 'GET',
    url: `https://ds2.9packsoftware.com/9PackXRFS/Vision/Live/EquipmentTypes/${user}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  console.log(res);
  return res.data;
};

export const manufacturDataAsync = async user => {
  const res = await axios({
    method: 'GET',
    url: `https://ds2.9packsoftware.com/9PackXRFS/Vision/Live/ManufacturersDetails/${user}?TechnicianCode=${user}&TechnicianPin=${user}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  console.log(res);
  return res.data;
};

export const getPartNumberAsync = async user => {
  const res = await axios({
    method: 'GET',
    url: `https://ds2.9packsoftware.com/9PackXRFS/Vision/Live/Parts/${user}?TechnicianCode=${user}&TechnicianPin=${user}&LastDate=01-01-1990&Index=0&Count=2`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  console.log(res);
  return res.data;
};

export const generateTokenAsync = async user => {
  console.log(user, 'generateTokenAsync');
  const res = await RNFetchBlob.config({
    trusty: true,
  })
    .fetch(
      'POST',
      TWILIO_URL + `/api/token`,
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      JSON.stringify({
        serviceSid: 'ISc3df9f655e83415e9bf7ef48599575bd',
        identity: user,
      }),
    )
    .then(resp => resp.json())
    .then(resJson => {
      console.log(resJson);
      return resJson;
    })
    .catch(err => {
      console.log(err);
    });
  return res;
  // const res = await axios({
  //   method: 'POST',
  //   url: `${TWILIO_URL}/api/token`,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   data: {serviceSid: 'ISc3df9f655e83415e9bf7ef48599575bd', identity: user},
  // });
  // console.log(res);
  // return res.data;
};

export const createConversationAsync = async name => {
  const res = await RNFetchBlob.config({
    trusty: true,
  })
    .fetch(
      'POST',
      TWILIO_URL + `/create`,
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      JSON.stringify({
        name: `Support Chat with ${name}`,
      }),
    )
    .then(resp => resp.json())
    .then(resJson => {
      console.log(resJson);
      return resJson;
    })
    .catch(err => {
      console.log(err);
    });
  return res;
};

export const addParticipant = async (token, user) => {
  const res = await RNFetchBlob.config({
    trusty: true,
  })
    .fetch(
      'POST',
      TWILIO_URL + `/conversation`,
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      JSON.stringify({
        chatId: token,
        identity: user,
      }),
    )
    .then(resp => resp.json())
    .then(resJson => {
      console.log(resJson);
      return resJson;
    })
    .catch(err => {
      console.log(err);
    });
  return res;
};

export const addParticipantWithNo = async (token, phone) => {
  console.log(phone);
  const res = await RNFetchBlob.config({
    trusty: true,
  })
    .fetch(
      'POST',
      TWILIO_URL + `/add`,
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      JSON.stringify({
        conversationID: token,
        MobileCustomer: phone,
        MobileHost: '+18334983239',
      }),
    )
    .then(resp => resp.json())
    .then(resJson => {
      console.log(resJson);
      return resJson;
    })
    .catch(err => {
      console.log(err);
    });
  return res;
};

export const getContactsAsync = async () => {
  const res = await RNFetchBlob.config({
    trusty: true,
  })
    .fetch('GET', BASE_URL + `/getAllTechnicians`, {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    .then(resp => resp.json())
    .then(resJson => {
      console.log(resJson);
      return resJson;
    })
    .catch(err => {
      console.log(err);
    });
  return res;
};

export const getContactPhoneNoAsync = async (user, contactNumber) => {
  const res = await RNFetchBlob.config({
    trusty: true,
  })
    .fetch('GET', BASE_URL + `/fetchPhonenumbers/${user}/${contactNumber}`, {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    .then(resp => resp.json())
    .then(resJson => {
      console.log(resJson);
      return resJson;
    })
    .catch(err => {
      console.log(err);
    });
  return res;
};
