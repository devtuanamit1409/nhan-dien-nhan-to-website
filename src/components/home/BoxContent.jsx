import React from "react";

const BoxContent = ({ content }) => {
	return (
		<div
			className='bg-white shadow-md rounded-lg p-6 mx-auto mt-4'
			dangerouslySetInnerHTML={{ __html: content }}></div>
	);
};

export default BoxContent;
