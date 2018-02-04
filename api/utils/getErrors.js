import { forEach } from "lodash";

export default errors => {
	const result = {};
	forEach(errors, (val, key) => {
		result[key] = val.message;
	});
	return result;
};
