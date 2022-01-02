import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import Icons from "@/components/_common/Icons/Icons";
import useFriendsQuery from "@/hooks/react-query/domain/playground/friends/useFriendsQuery";
import { newFriendDto } from "@/types/domain/playground/FriendDto";
import { Button } from "@material-ui/core";
import _ from "lodash";
import React, { useState } from "react";
import FriendDialog from "./FriendDialog/FriendDialog";
interface Props {
  test?: string;
}

const Friends = (props: Props) => {
  const [friendDialog, setFriendDialog] = useState(false);
  const [friendDialogValue, setFriendDialogValue] = useState(newFriendDto());

  const { data: friends } = useFriendsQuery();

  const openRandom = () => {
    if (friends?.length > 0) {
      const randomFriend = _.sample(friends);
      setFriendDialogValue(randomFriend);
      setFriendDialog(true);
    }
  };

  return (
    <div>
      <FlexVCenter style={{ gap: 24 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFriendDialog(true)}
        >
          + Add Friend
        </Button>

        <Button startIcon={<Icons.Shuffle />} onClick={openRandom}>
          Get random
        </Button>
      </FlexVCenter>

      {friends?.map((friend) => (
        <div key={friend.id}>{friend.name}</div>
      ))}

      <FriendDialog
        initialValue={friendDialogValue}
        onClose={() => setFriendDialog(false)}
        open={friendDialog}
      />
    </div>
  );
};

export default Friends;
