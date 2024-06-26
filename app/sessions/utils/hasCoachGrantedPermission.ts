import { getSingleUserSession } from '@/src/utils/getSingleUserSession';

export const hasCoachGrantedPermission = async ({ sessionId, userId, approvable }) => {
	const isConfirmed = await getSingleUserSession(sessionId, userId);

	if (approvable && isConfirmed?.userSession?.isConfirmed) {
		return true;
	}

	return false;
};
