"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BoxContentRight = ({ list_tinh_cach }) => {
	return (
		<div className='py-0 md:py-8'>
			<div className='bg-white shadow-md rounded-md overflow-hidden'>
				{/* Phần hình ảnh và tiêu đề */}
				<div className='relative'>
					<Image
						src='/bg2.png'
						alt='16 nhóm tính cách MBTI'
						width={500}
						height={200}
						className='w-full h-40 object-cover'
					/>
					<div className='absolute top-0 left-0 p-4 bg-white bg-opacity-75 w-full'>
						<h2 className='text-lg font-bold text-gray-900'>
							16 nhóm tính cách MBTI
						</h2>
					</div>
				</div>

				{/* Phần danh sách */}
				<ul className='p-4 bg-white'>
					{list_tinh_cach && list_tinh_cach.length > 0 ? (
						list_tinh_cach.map((item, index) => (
							<li key={index} className='mb-2'>
								<Link
									href={`/${item.attributes.slug}`}
									className='text-blue-600 hover:text-blue-800 font-medium flex justify-between'>
									<span className='font-bold'>{item.attributes.type}</span>
									<span>{item.attributes.type_tieng_viet}</span>
								</Link>
							</li>
						))
					) : (
						<li>Không có dữ liệu nhóm tính cách.</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default BoxContentRight;
