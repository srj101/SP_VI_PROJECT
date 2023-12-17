import React from 'react'
import { message, Upload } from 'antd';
import { CollectionsOutlined } from '@material-ui/icons';
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
function Status() {
    return (
        <form className="bg-white shadow rounded-lg mb-6 p-4 ">
            <textarea name="message" placeholder="Type something..." className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"></textarea>
            <footer className="flex justify-between mt-2">
                <div className="flex gap-2">
                    <span className="flex items-center justify-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                        <Upload {...props} multiple maxCount={5}
                            showUploadList={false}
                        >
                            <CollectionsOutlined fontSize='small' />
                        </Upload>
                    </span>

                </div>
                <button className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">Send
                    {/* <svg className="ml-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> */}
                </button>
            </footer>
        </form>
    )
}

export default Status
