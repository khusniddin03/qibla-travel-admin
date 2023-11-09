import { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { SendPostRequest } from './uploadImg.api';
// import { useSelector } from 'react-redux';
import "./uploadImg.css";

interface IProps {
    title: string;
    setRespnonseUrl: (value: string | null) => void;
    staticImgUrl: string | null;
    error: boolean;
}

export default function UploadImg({ title, setRespnonseUrl, staticImgUrl, error }: IProps) {
    const [res, sendFile] = SendPostRequest();
    const [urlImg, setUrlImg] = useState('');
    // const token = useSelector(store => store.user.token);
    const [err, setErr] = useState(false);
    const baseurl = 'https://api.qibla-travel.uz/public/'

    const uploadPicture = (e: any) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                // 'Authorization': token
            },
        };
        sendFile('/public/api/upload-file', formData, config)
        setErr(false);
    };

    useEffect(() => {
        if (res?.data?.location) {
            setRespnonseUrl(res?.data?.location);
            setUrlImg(baseurl + res?.data?.location);
        }
    }, [res, setRespnonseUrl]);

    useEffect(() => {
        if (staticImgUrl) {
            setUrlImg(baseurl + staticImgUrl);
        } else {
            setUrlImg('');
        }
        setRespnonseUrl(staticImgUrl);
    }, [staticImgUrl, setRespnonseUrl]);

    useEffect(() => {
        setErr(error);
    }, [error]);

    const style = {
        width: '100px',
        height: '100px',
        border: '1px dashed #d9d9d9',
        borderRadius: '2px',
        background: '#fafafa',
    };

    const newImageSet = () => {
        setRespnonseUrl("");
        setUrlImg("");
        setErr(true);
    }

    return (
        <>
            <div>
                {
                    !urlImg ?
                        <Button variant="outlined" component="label" style={{ ...style, borderColor: err ? "red" : "#d9d9d9", }}>
                            <div style={{ textAlign: "center", color: "#637381" }}>
                                <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={err ? "red" : "#637381"} className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span style={{ color: err ? "red" : "#637381", display: "block", fontSize: "14px", fontWeight: "300" }}>{title}</span>
                            </div>

                            <input type="file" hidden accept="image/*" onChange={uploadPicture} />
                        </Button> :
                        <div className='img-wrap-upload'>
                            <Stack display="block" flexBasis="100%" width="100%">
                                {urlImg ? <img style={{ width: '100px', height: '100px', objectFit: 'cover' }} src={urlImg} alt="ss" /> : ''}
                            </Stack>
                            <Button onClick={newImageSet} variant="outlined">
                                <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Button>
                        </div>
                }
                <Stack flexBasis="100%" width="100%">
                    {err ? <Typography sx={{ color: "red", fontSize: "12px" }}>Rasm yuklash shart!!</Typography> : ''}
                </Stack>
            </div>

        </>
    );
}