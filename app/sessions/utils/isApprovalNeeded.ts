import { getSingleUserSession } from '@/src/utils/getSingleUserSession';

export const isApprovalNeeded = async ({ approvable, sessionId, userId }) => {
	const isConfirmed = await getSingleUserSession(sessionId, userId);

	if (approvable && !isConfirmed?.userSession?.isConfirmed) {
		return true;
	}

	return false;
};
