import AsyncStorage from '@react-native-community/async-storage';
import asyncHandlerJSON from '../utils/asyncHandler';

export default {
  async addBid(employeeId, menuTitle, statedata, bid) {
    const newData = {
      ...statedata,
      [menuTitle]: [...statedata[menuTitle], bid],
    };

    return await AsyncStorage.setItem(employeeId, JSON.stringify(newData));
  },

  async getAllBids(employeeId) {
    const bids = await AsyncStorage.getItem(employeeId);

    console.log({bids});

    if (bids) {
      return bids;
    }

    await AsyncStorage.setItem(employeeId, JSON.stringify({}));

    return '{}';
  },
};
