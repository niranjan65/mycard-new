import { useFrappeGetCall, useFrappeGetDocList } from 'frappe-react-sdk'
import React from 'react'
import { CreateChannelButton } from './CreateChannelButton';
import { useNavigate } from 'react-router-dom';

const GroupList = () => {
    const navigate = useNavigate();
    // Get all DM channels
      const { data: channelsData, error: channelsError, isLoading: isLoadingChannels, mutate: refreshChannels } = 
        useFrappeGetCall('raven.api.raven_channel.get_all_channels', {
          hide_archived: true
        });

    console.log("channelList", channelsData)
   
  return (
    <div className='w-60 bg-white shadow-sm rounded-[20px] text-xs mt-5'>
        
                    <div className='w-full flex justify-between items-center p-3'>
                        <div className='flex items-center gap-2'>
                            <CreateChannelButton refreshChannels={refreshChannels} />
                            <h1>Group</h1>
                        </div>
                        <p>{channelsData?.message?.channels.length}</p>
                    </div>

                    <div className='h-[1px] w-full bg-gray-200'></div>

                    {
                        channelsData && channelsData.message.channels.map((channel, index) => (
                            <div key={index} onClick={() => window.location.href = `https://mycardpng.com/raven/New%20admin%20office%20construction/${channel.name}`} className='w-full flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100'>
                                <div className='bg-blue-500 text-white flex items-center justify-center rounded-full h-10 w-10'>{channel.channel_name[0].toUpperCase()}</div>
                                <p>{channel.channel_name}</p>
                            </div>
                        ))
                    }

                    {/* <div className='w-full flex items-center gap-2 p-3'>
                        <div className='bg-yellow-500 text-white flex items-center justify-center rounded-full h-10 w-10'>SupT</div>
                        <p>Support Team</p>
                    </div> */}
                </div>
  )
}

export default GroupList
