import CryptoJS from 'crypto-js';

import GeneralApiList from 'src/pages/general/GeneralApiList';

// eslint-disable-next-line import/no-cycle
import { useSnackbar } from 'src/components/snackbar';

// eslint-disable-next-line import/no-cycle
import { postToServer } from './axios';
import securityKeys from "./security-keys";

export const isNull = (value) => value === null || value === undefined || value === "";

export const isNullWithZero = (value) => value === null || value === undefined || value === "" || Number(value) === 0

export const encryptAESText = (data) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(securityKeys.AES.KEY), {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const ivHex = CryptoJS.enc.Hex.stringify(iv);
  const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

  return `${ivHex}:${encryptedHex}`
}

export const decryptAESText = (encrypted) => {
  try {
    const textParts = encrypted.split(':');
    const iv = CryptoJS.enc.Hex.parse(textParts.shift());
    const encryptedText = CryptoJS.enc.Hex.parse(textParts.join(':'));
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedText },
      CryptoJS.enc.Utf8.parse(securityKeys.AES.KEY),
      { iv }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const useSnackbarToast = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showToast = (message, type, options = {}) => {
    enqueueSnackbar(message, {
      variant: type, ...options, onClose: options.onClose, style: {
        zIndex: 2000,
      },
    });
  }
  return showToast;
};

export function isExitDuplicateDataChecking(action, text, tableName) {
  return new Promise((resolve, reject) => {
    let data = {}
    const result = {}
    data = {
      "tableName": tableName,
      "fieldName": action,
      "fieldValue": text
    }
    postToServer(GeneralApiList.API_URL_FOR_DATA_DUPLICATE_VALIDATION, data)
      .then(res => {
        if (res[0].DML_RETURN > 0) {
          result.STATUS = 'error';
          result.ERROR_MESSAGE = "IS_ALREADY_TAKEN";
          result.ERROR = true;
        } else {
          result.STATUS = 'success';
          result.ERROR_MESSAGE = '';
          result.ERROR = false;
        }
        resolve(result);
      })
      .catch(error => {
        console.log(error);
      });
  })
}

export const validateUserEndDate = (currentdate, enteredDate) => {
  const currentDateObject = new Date(currentdate);
  const enteredDateObject = new Date(enteredDate);

  if (Number.isNaN(enteredDateObject)) {
    return false;
  }

  return enteredDateObject.getFullYear() > currentDateObject.getFullYear() ||
    (enteredDateObject.getFullYear() === currentDateObject.getFullYear() &&
      enteredDateObject.getMonth() > currentDateObject.getMonth()) ||
    (enteredDateObject.getFullYear() === currentDateObject.getFullYear() &&
      enteredDateObject.getMonth() === currentDateObject.getMonth() &&
      enteredDateObject.getDate() >= currentDateObject.getDate());
}

export const validateFileExtensionForImage = (extension) => {
  const imageExtension = ["jpg", "jpeg", "png", "gif"]
  return imageExtension.includes(extension);
}