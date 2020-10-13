import AsyncStorage from '@react-native-community/async-storage';
import asyncHandlerJSON from '../utils/asyncHandler';

export default {
  async addBid(bidInfo, employeeId, menuTitle, collection) {
    const oldbids = collection[menuTitle] || [];

    if (oldbids.length) {
      const hasBid = oldbids.find((bid) => bid.bidId === bidInfo.bidId);

      if (hasBid) {
        throw {message: `Bid ID ${bidInfo.bidId} already added to favorites!`};
      }
    }

    const newData = {
      ...collection,
      [menuTitle]: [...oldbids, bidInfo],
    };

    return await AsyncStorage.setItem(employeeId, JSON.stringify(newData));
  },

  async getAllBids(employeeId) {
    const bids = await AsyncStorage.getItem(employeeId);

    if (bids) {
      return bids;
    }

    await AsyncStorage.setItem(employeeId, JSON.stringify({}));

    return '{}';
  },

  async removeBid(bidId, employeeId, menuTitle, collection) {
    try {
      const bidsJSON = await this.getAllBids(employeeId);
      const bids = JSON.parse(bidsJSON);
      const currentBids = bids[menuTitle];
      let match = false;

      const results = currentBids.filter((bid) => {
        if (bid.bidId === bidId) {
          match = true;
          return false;
        }

        return true;
      });

      if (!match) {
        throw new Error(`Bid not found!`);
      }

      bids[menuTitle] = results;

      await AsyncStorage.setItem(employeeId, JSON.stringify(bids));

      return [1, null];
    } catch (error) {
      return [null, error];
    }
  },

  async clearBids(employeeId = '', menuTitle = '', collection = {}) {
    try {
      if (!menuTitle || !employeeId) {
        throw new Error('Missing employeeId or menuTitle');
      }

      collection[menuTitle] = [];
      await AsyncStorage.setItem(employeeId, JSON.stringify(collection));
      
      return [1, null];
    } catch (error) {
      return [null, error];
    }
  },
};
