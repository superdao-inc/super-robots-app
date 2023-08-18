/* eslint-disable no-shadow */

export enum MessageType {
	DELAYED_VOTING_EVENT = 'DELAYED_VOTING_EVENT'
}

export type DelayedVotingEventMessageData = {
	proposalId: string;
	edition: number;
	startAt: Date;
	endAt: Date;
	from: string;
	afterIter: boolean;
};

export type MessageData = {
	[MessageType.DELAYED_VOTING_EVENT]: DelayedVotingEventMessageData;
};

export type DelayedVotingEventMessage = {
	resendTimeout?: number;
	type: MessageType.DELAYED_VOTING_EVENT;
	data: DelayedVotingEventMessageData;
};
