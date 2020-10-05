import AsyncStorage from '@react-native-community/async-storage';
import asyncHandlerJSON from '../utils/asyncHandler';

export default {
  async addBid(employeeId, menuTitle, collection, bidInfo) {
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

  async removeBid(employeeId, menuTitle, bidId) {
    try {
      const bidsJSON = await this.getAllBids(employeeId);
      const bids = JSON.parse(bidsJSON);
      const currentBids = bids[menuTitle];
      let match = false;

      console.log({bids});

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
      console.log(bids);

      await AsyncStorage.setItem(employeeId, JSON.stringify(bids));
      console.log(bids);

      return [1, null];
    } catch (error) {
      return [null, error];
    }
  },
};
