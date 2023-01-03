import User from "../models/User.js";
import FriendsRequests from '../models/FriendsRequests.js'

export const sendFriendRequest = async(req, res) =>{
    try {
      const { from, to } = req.body

      const alreadySent = await FriendsRequests.findOne({
        from:from, to:to
      })
      if(alreadySent) return res.status(500).json({ message: 'Already sent' })
      const newRequest = new FriendsRequests({ from, to })
      await newRequest.save()

      await User.findByIdAndUpdate(
        from,
        {
          $push:{
            friendsRequests: newRequest._id,
          }
        }
      )
      await User.findByIdAndUpdate(
        to,
        {
          $push:{
            friendsRequests: newRequest._id,
            }
          }
      )
      return res.sendStatus(200)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getFriendsRequests = async(req, res) => {
  const friendrequests = FriendsRequests.find({}).populate('from').populate('to')
  return res.json(friendrequests)
}

export const resFriendRequest = async(req, res) => {
  try {
    const { from, to } = req.body
    const friendrequest = await FriendsRequests.findOne({from:to, to:from})
    if(!friendrequest) return res.status(404).json({ message: 'request not found' })
    await User.findByIdAndUpdate(
      from,
      {
        $pull:{
          friendsRequests: friendrequest._id,
        }
      }
    )
    await User.findByIdAndUpdate(
      to,
      {
        $pull:{
          friendsRequests: friendrequest._id,
        }
      }
    )
    await User.findByIdAndUpdate(
      from,
      {
        $push:{
          friends: to,
        }
      }
    )
    await User.findByIdAndUpdate(
      to,
      {
        $push:{
          friends: from,
        }
      }
    )
    await FriendsRequests.findOneAndDelete({from:from, to:to})
    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).json({ message: error.message })

  }
}