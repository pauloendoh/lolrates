export default interface FriendDto {
  id: number;
  userId: number;
  name: string;
}

export const newFriendDto = (partial?: Partial<FriendDto>): FriendDto => ({
  id: null,
  userId: null,
  name: "",

  ...partial,
});
