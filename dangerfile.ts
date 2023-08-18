import { danger, warn } from 'danger';

const isTitleOK = /^(FIX:|HOTFIX:|NI:|Release: |(Draft: )?[a-z]{1,20}-\d{1,6}:?) .+/i.test(danger.gitlab.mr.title);

if (!isTitleOK) {
	warn(
		'Bad title. Use following formats: "XXX-123: ...", "Draft: XXX-123: ...", "FIX: ...", "NI: ..." (NI means No Issue)'
	);
}
