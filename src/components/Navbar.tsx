import React, { useState } from 'react';
import { Menu, Modal, Form, Input, Button, Card, Empty, Upload, message, Checkbox, Select } from 'antd';
import { 
    PictureOutlined, FormatPainterOutlined, HomeOutlined, TableOutlined, UploadOutlined, DownloadOutlined, OneToOneOutlined
} from '@ant-design/icons';
import Loader from 'react-loader-spinner';
import {getTextToImage} from '../api/getTextToImage';
import {downloadBackground} from '../api/downloadBackground';
import {removeBackground} from '../api/removeBackground'; 
import {combineImages} from '../api/combineImages';
import {combineSecondObject} from '../api/combineSecondObject';
import {addCircle} from '../api/addCircle';
import {addRectangle} from '../api/addRectangle';
import {blackAndWhiteImage} from '../api/blackAndWhiteImage';
import './style/NavbarStyle.css';
import LaptopImage from '../assets/laptopImage.svg';

const { Option } = Select;

const Navbar = () => {
    // Normal State
    const [loading, setLoading] = useState(false);
    const [downloadLoader, setDownloadLoader] = useState(false);
    const [combineImageLoader, setCombineImageLoader] = useState(false);
    const [completeCombine, setCompleteCombine] = useState(0);
    const [showScale, setShowScale] = useState(false);
    const [dark, setDark] = useState();
    // Background Modal
    const [visibleBackgroundTab, setVisibleBackgroundTab] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [textData, setTextData] = useState([]);
    // Sketch Modal
    const [visibleSketchTab, setvisibleSketchTab] = useState(false);
    const [confirmLoadingSketchTab, setConfirmLoadingSketchTab] = useState(false);
    // Upload Background File
    const [visibleUploadBackgroundTab, setvisibleUploadBackgroundTab] = useState(false);
    const [confirmLoadingUploadBackgroundTab, setConfirmLoadingUploadBackgroundTab] = useState(false);
    // const [previewVisible, setPreviewVisible] = useState(false);
    // const [previewImage, setPreviewImage] = useState('');
    // const [previewTitle, setPreviewTitle] = useState('');
    const [flatlist, setFlatlist] = useState([]);
    // Combine Modal
    const [visibleCombineTab, setvisibleCombineTab] = useState(false);
    const [confirmLoadingCombineTab, setConfirmLoadingCombineTab] = useState(false);
    // Balck and White Modal
    const [visibleBlackAndWhiteTab, setvisibleBlackAndWhiteTab] = useState(false);
    const [confirmLoadingBlackAndWhiteTab, setConfirmLoadingBlackAndWhiteTab] = useState(false);
    const [showNewGeneratedImage, setShowNewGeneratedImage] = useState(false);
    const [showBWImageDownloadBtn, setShowBWImageDownloadBtn] = useState(false);
    const [processingBWImage, setProcessingBWImage] = useState(false);
    // Set Shape
    const [addCircleShapeState, removeCircleShapeState] = useState(false);
    const [addRectangleleShape, removeRectangleShape] = useState(false);
    // set Number
    const [getMainImageNumber, setImageNumber] = useState(1);

    const showModalBackgroundTab = () => setVisibleBackgroundTab(true);
    const handleCancelBackgroundTab = () => setVisibleBackgroundTab(false);
    const showModalSketchTab = () => setvisibleSketchTab(true);
    const handleCancelSketchTab = () => setvisibleSketchTab(false);
    const showModalCombineTab = () => setvisibleCombineTab(true);
    const handleCancelCombineTab = () => setvisibleCombineTab(false);
    const showModalUploadBackgroundTab = () => setvisibleUploadBackgroundTab(true);
    const handleCancelUploadBackgroundTab = () => setvisibleUploadBackgroundTab(false);
    const showModalBlackAndWhiteTab = () => setvisibleBlackAndWhiteTab(true);
    const handleCancelBlackAndWhiteTab = () => setvisibleBlackAndWhiteTab(false);

    const handleOkBackgroundTab = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisibleBackgroundTab(false);
            setConfirmLoading(false);
        }, 1000);
    }

    // const { Dragger } = Upload;
    // const dragProps = {
    //     name: 'file',
    //     multiple: true,
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     onChange(info: any) {
    //       const { status } = info.file;
    //       if (status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully.`);
    //       } else if (status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    //   };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const optionsCheckobox = [
        { label: 'Dark', value: 'Dark' }
    ];
      
    const onFinish = (values: any) => {
        setLoading(true);
        setDark(values.dark);
        getTextToImage(values.textSearch, values.number)
        .then(res => {
            setTextData(res.data.responseData);
            console.log(res.data.responseData);
            setLoading(false);
        })
        .catch(err => alert(err));
        console.log('Success:', values);
    };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log(`Failed: ${errorInfo}`);
    };

    const chooseBackgroundImage = (URL: String) => {
        setDownloadLoader(true);
        console.log(dark)
        downloadBackground(URL, 1, dark)
        .then(res => {
            // console.log(res.data)
            if(Number(res.data.error) === 0 ){
                setDownloadLoader(false);
                success();
            } else {
                setDownloadLoader(false);
                error();
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    const success = () => {
        Modal.success({
          content: 'Yeah! We saved your Image',
        });
    }

    const imageCombineSuccess = () => {
        Modal.success({
          content: 'Yeah! Your Image is Ready',
        });
    }

    const imageCombineSuccessMsg = () => {
        message.success(`Image Added`)
    }

    const error = () => {
        Modal.error({
          title: 'This is an error message',
          content: 'some messages...some messages...',
        });
    }

    // Sketch Area
    const handleOkSketchTab = () => {
        setConfirmLoadingSketchTab(true);
        setTimeout(() => {
            setvisibleSketchTab(false);
            setConfirmLoadingSketchTab(false);
        }, 1000);
    }

    const onFinishURL = (values: any) => {
        // console.log('Success', values);
        setDownloadLoader(true);
        downloadBackground(values.sketchURL, 2, undefined)
        .then(res => {
            // console.log(res.data)
            if(Number(res.data.error) === 0 ){
                removeBackground('object.jpg')
                .then(response => {
                    // console.log(response.data.error);
                    if(Number(response.data.error) === 0 ){
                        // Second Image Process Start Here
                        if(Number(getMainImageNumber) > 1) {
                            downloadBackground(values.sketchURL2, 3, undefined)
                            .then(res => {
                                // console.log(res.data)
                                if(Number(res.data.error) === 0 ){
                                    removeBackground('object2.jpg')
                                    .then(response => {
                                        // console.log(response.data.error);
                                        if(Number(response.data.error) === 0 ){
                                            setDownloadLoader(false);
                                            success();
                                        } else {
                                            setDownloadLoader(false);
                                            error();
                                        }
                                    })
                                    .catch(error => alert(error));
                                } else {
                                    setDownloadLoader(false);
                                    error();
                                }
                            })
                            .catch(error => {
                                alert(error)
                            });
                        }
                        // Second Image Process ends here
                        else {
                            setDownloadLoader(false);
                            success();
                        }
                    } else {
                        setDownloadLoader(false);
                        error();
                    }
                })
                .catch(error => alert(error));
            } else {
                setDownloadLoader(false);
                error();
            }
        })
        .catch(error => {
            alert(error)
        });
        // alert(values.sketchURL);
    }

    const onFinishFailedURL = (errorInfo: any) => {
        console.log(`Failed: ${errorInfo}`);
    }

    // sketch Processing
    const onFinishSketchNumber = (values: any) => {
        setImageNumber(Number(values))
    }

    // Upload Backgroung Image
    const handleOkUploadBackgroundTab = () => {
        setConfirmLoadingUploadBackgroundTab(true);
        setTimeout(() => {
            setvisibleUploadBackgroundTab(false);
            setConfirmLoadingUploadBackgroundTab(false);
        }, 1000);
    }

    const props = {
        name: 'background',
        action: 'http://localhost:8000/api/uploadBackground',
        multiple: true,
        istType: 'picture',
        headers: {
          authorization: 'authorization-file',
        },
        onChange(info: any) {
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

    // Combine Tab Area
    const handleOkCombineTab = () => {
        setConfirmLoadingCombineTab(true);
        setTimeout(() => {
            setvisibleCombineTab(false);
            setConfirmLoadingCombineTab(false);
        }, 1000);
    }

    const FindPosition = (oElement: any) => {
        if(typeof( oElement.offsetParent ) != "undefined") {
            for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
                posX += oElement.offsetLeft;
                posY += oElement.offsetTop;
            }
            return [ posX, posY ];
        }
        else {
          return [ oElement.x, oElement.y ];
        }
    }

    const GetCoordinates = (e: any) => {
        let PosX = 0;
        let PosY = 0;
        let ImgPos;

        ImgPos = FindPosition(document.getElementById("myImgId"));
        if (!e) var e: any = window.event;
        if (e.pageX || e.pageY) {
            PosX = e.pageX;
            PosY = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        PosX = PosX - ImgPos[0];
        PosY = PosY - ImgPos[1];

        setCombineImageLoader(true);
            combineImages(PosX, PosY, Number(1))
            .then(res => {
                console.log(res.data)
                if(Number(res.data.error) === Number(0)){
                    setCombineImageLoader(false);
                    // setCompleteCombine(1);
                    imageCombineSuccessMsg();
                }
            })
            .catch(error => alert(error));
    }

    const getClickedPosition = () => {
        const myImg: any = document.getElementById("myImgId");
        myImg.onmousedown = GetCoordinates;
    }

    const GetCoordinatesForSecondObject = (e: any) => {
        let PosX = 0;
        let PosY = 0;
        let ImgPos;

        ImgPos = FindPosition(document.getElementById("myImgId"));
        if (!e) var e: any = window.event;
        if (e.pageX || e.pageY) {
            PosX = e.pageX;
            PosY = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        PosX = PosX - ImgPos[0];
        PosY = PosY - ImgPos[1];

        setCombineImageLoader(true);
            combineSecondObject(PosX, PosY, Number(1))
            .then(res => {
                // console.log(res.data)
                if(Number(res.data.error) === Number(0)){
                    setCombineImageLoader(false);
                    // setCompleteCombine(1);
                    imageCombineSuccessMsg();
                }
            })
            .catch(error => alert(error));
    }

    const getClickedPositionSecondImage = () => {
        const myImg: any = document.getElementById("myImgId");
        myImg.onmousedown = GetCoordinatesForSecondObject;
    }

    const onFinishFinalCombination = (values: any) => {
        // console.log('success', values);
        setCombineImageLoader(true);
        combineImages(Number(values.x_value), Number(values.y_value), Number(0))
        .then(res => {
            // console.log(res.data);
            if(Number(res.data.error) === 0){
                setCombineImageLoader(false);
                setCompleteCombine(1);
                imageCombineSuccess();
            }
        })
        .catch(error => alert(error));
    }

    const onFinishFailedCombination = (errorInfo: any) => {
        console.log(`ERROR ${errorInfo}`);
    }

    // Add Shape Area
    const GetCoordinatesShape = (e: any) => {
        let PosX = 0;
        let PosY = 0;
        let ImgPos;

        ImgPos = FindPosition(document.getElementById("myImgId"));
        if (!e) var e: any = window.event;
        if (e.pageX || e.pageY) {
            PosX = e.pageX;
            PosY = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        PosX = PosX - ImgPos[0];
        PosY = PosY - ImgPos[1];

        setCombineImageLoader(true);
            addCircle(PosX, PosY, Number(1))
            .then(res => {
                console.log(res.data)
                if(Number(res.data.error) === Number(0)){
                    setCombineImageLoader(false);
                    // setCompleteCombine(1);
                    imageCombineSuccessMsg();
                }
            })
            .catch(error => alert(error));
    }

    const getClickedPositionShape = () => {
        const myImg: any = document.getElementById("myImgId");
        myImg.onmousedown = GetCoordinatesShape;
    }

    // Rectangle
    const GetCoordinatesShapeRectangle = (e: any) => {
        let PosX = 0;
        let PosY = 0;
        let ImgPos;

        ImgPos = FindPosition(document.getElementById("myImgId"));
        if (!e) var e: any = window.event;
        if (e.pageX || e.pageY) {
            PosX = e.pageX;
            PosY = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        PosX = PosX - ImgPos[0];
        PosY = PosY - ImgPos[1];

        setCombineImageLoader(true);
            addRectangle(PosX, PosY, Number(1))
            .then(res => {
                console.log(res.data)
                if(Number(res.data.error) === Number(0)){
                    setCombineImageLoader(false);
                    // setCompleteCombine(1);
                    imageCombineSuccessMsg();
                }
            })
            .catch(error => alert(error));
    }

    const getClickedPositionShapeRectangle = () => {
        const myImg: any = document.getElementById("myImgId");
        myImg.onmousedown = GetCoordinatesShapeRectangle;
    }

    const showOutputImage = () => {
        setCompleteCombine(1);
        imageCombineSuccess();
    }

    // Balck and White Tab
    const handleOkBlackAndWhiteTab = () => {
        setConfirmLoadingBlackAndWhiteTab(true);
        setTimeout(() => {
            setvisibleBlackAndWhiteTab(false);
            setConfirmLoadingBlackAndWhiteTab(false);
        }, 1000);
    }

    const makeBlackAndWhiteFunc = () => {
        setProcessingBWImage(true);
        setShowNewGeneratedImage(false);
        blackAndWhiteImage()
        .then(res => {
            if(Number(res.data.error) === Number(0)){
                setShowBWImageDownloadBtn(true);
                setShowNewGeneratedImage(true);
                setProcessingBWImage(false);
            }
        })
        .catch(err => alert(err));
    }
    
    return(
        <div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
                Home
            </Menu.Item>
            <Menu.Item key="2" icon={<PictureOutlined />} onClick={showModalBackgroundTab}>
                Background
            </Menu.Item>
            <Menu.Item key="3" icon={<FormatPainterOutlined />} onClick={showModalSketchTab}>
                Draw a Sketch
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />} onClick={showModalUploadBackgroundTab}>
                Upload Background
            </Menu.Item>
            <Menu.Item key="5" icon={<TableOutlined />} onClick={showModalCombineTab}>
                Combine Images
            </Menu.Item>
            <Menu.Item key="6" icon={<OneToOneOutlined />} onClick={showModalBlackAndWhiteTab}>
                B&W Output
            </Menu.Item>
        </Menu>

        {/* Background Modal */}
        <Modal
          title="Choose A Background"
          visible={visibleBackgroundTab}
          onOk={handleOkBackgroundTab}
          width={800}
          confirmLoading={confirmLoading}
          onCancel={handleCancelBackgroundTab}
        >
            <Form
                {...layout}
                name="basic"
                layout="horizontal"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="Enter a text"
                    name="textSearch"
                    rules={[{ required: true, message: 'Please input a text!' }]}
                    >
                    <Input placeholder="Enter a text to Search" />
                </Form.Item>

                <Form.Item
                    label="Number"
                    name="number"
                    rules={[{ required: true, message: 'Please enter a number!' }]}
                    >
                    <Input placeholder="How Many Image You Want to See ?" />
                </Form.Item>

                <Form.Item
                    label="Background"
                    name="dark"
                    >
                    <Checkbox.Group options={optionsCheckobox} defaultValue={['Dark']} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>

            {/* Text to Image Search Result */}
            {downloadLoader ? 
                <div style={{ marginLeft: '40%', marginTop: 35 }}>
                    <Loader
                        type="Grid"
                        color="#044687"
                        height={100}
                        width={100}
                    />
                </div>
            :
            <>
            {loading ? 
                <div style={{ marginLeft: '40%', marginTop: '10%' }}>
                    <Loader
                        type="Bars"
                        color="#044687"
                        height={100}
                        width={100}
                    />
                </div> 
            :
            <Card>
                {loading ? null : <p style={{ textAlign: 'center' }}>Choose from a wide range of Images</p> }
                {textData.map((data:any, index: Number) => (
                    <Card.Grid>
                        <div onClick={() => chooseBackgroundImage(data.url)}>
                        <Empty 
                            image={data.url}
                            // imageStyle={{
                            //     width: 200,
                            // }}
                            description={
                            <span>Image {Number(index) + Number(1)}</span>
                            }
                        />
                        </div>
                    </Card.Grid>
                ))}
            </Card>
            }
            </>
            }
        </Modal>

        {/* Sketch Modal */}
        <Modal
          title="Draw a Sketch"
          visible={visibleSketchTab}
          onOk={handleOkSketchTab}
          width={910}
          confirmLoading={confirmLoadingSketchTab}
          onCancel={handleCancelSketchTab}
        >
            <div className="drawDiv">
                <iframe id="myframe" src="http://localhost:5000/flaskr2/draft" scrolling="yes" frameBorder="0"></iframe>

                <div className="hideback"></div>
                <div className="hiidenDiv">
                    <img src={LaptopImage} width={170} className="laptopImage" alt="LaptopImage" />
                    <p>Your Sketch will be Search from a variety of Databases</p>
                </div>
            </div>

            <div style={{marginTop: 5}}></div>
            
            {/* Number of Image */}
            <Select 
                defaultValue="Select Number of Image" 
                style={{ width: 250, marginLeft: 150, marginBottom: 15 }} 
                onChange={onFinishSketchNumber}
                >
                <Option value="1">Single Image</Option>
                <Option value="2">Double Image</Option>
            </Select>

            <Form
                {...layout}
                name="basic"
                layout="horizontal"
                initialValues={{ remember: true }}
                onFinish={onFinishURL}
                onFinishFailed={onFinishFailedURL}
                >
                {/* {console.log('VALUES', getMainImageNumber)} */}
                {Number(getMainImageNumber) === 1 ?
                    <Form.Item
                        label="Enter the URL"
                        name="sketchURL"
                        rules={[{ required: true, message: 'Please Enter an URL!' }]}
                        >
                        <Input placeholder="Enter the URL" />
                    </Form.Item>
                : 
                <React.Fragment>
                    <Form.Item
                        label="Enter the URL"
                        name="sketchURL"
                        rules={[{ required: true, message: 'Please Enter an URL!' }]}
                        >
                        <Input placeholder="Enter the URL" />
                    </Form.Item>

                    <Form.Item
                        label="Enter the URL"
                        name="sketchURL2"
                        rules={[{ required: true, message: 'Please Enter an URL!' }]}
                        >
                        <Input placeholder="Enter the URL" />
                    </Form.Item>
                </React.Fragment>
                }

                {/* <Form.Item
                    label="Enter the Width"
                    name="sketchWidth"
                    rules={[{ required: true, message: 'Please Enter an Width' }]}
                    >
                    <Input placeholder="Enter the Width (X)" />
                </Form.Item>

                <Form.Item
                    label="Enter the Height"
                    name="sketchHeight"
                    rules={[{ required: true, message: 'Please Enter an Height' }]}
                    >
                    <Input placeholder="Enter the Width (Y)" />
                </Form.Item> */}

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>

            </Form>

            {/* <Dragger {...dragProps}>
                <p className="ant-upload-drag-icon">
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
                </p>
            </Dragger> */}

        </Modal>

        {/* Background Modal */}
        <Modal
            title="Choose A Background File"
            visible={visibleUploadBackgroundTab}
            onOk={handleOkUploadBackgroundTab}
            width={800}
            confirmLoading={confirmLoadingUploadBackgroundTab}
            onCancel={handleCancelUploadBackgroundTab}
            >
            <p>Want to upload your own background ? &nbsp; &nbsp;
                <Upload {...props}>
                    <Button>
                        <UploadOutlined /> Click to Upload
                    </Button>
                </Upload>
            </p>
        </Modal>

        {/* Combine Modal */}
        <Modal
          title="Combine Images"
          visible={visibleCombineTab}
          onOk={handleOkCombineTab}
          width={910}
          confirmLoading={confirmLoadingCombineTab}
          onCancel={handleCancelCombineTab}
        >
            <Button 
                onClick={() => setShowScale(!showScale)} 
                type="primary"
                >
                {showScale ? <span>Hide Scale</span> : <span>Show Scale</span>}
            </Button>

            {showScale ? 
                <div className="shapeDiv">
                    <div>
                        <Button 
                            type="primary" 
                            className="shapeRectBtn"
                            onClick={() => getClickedPositionShape()}
                            >
                            Circle
                        </Button>
                        <Button 
                            type="primary" 
                            className="shapeRectBtn"
                            onClick={() => getClickedPositionShapeRectangle()}
                            >
                            Rectangle
                        </Button>
                    </div>

                    <Button 
                        type="primary"
                        onClick={() => showOutputImage()}>
                        Show Image
                    </Button>
                </div>
            : 
            null}

            {showScale ?
                <div>
                    <div>
                        {getMainImageNumber === 1 ?
                            <div className="scaleArea">
                                <Button onClick={() => getClickedPosition()} type="primary" className="initilizeBtn">
                                    Initilize the Scale For Image
                                </Button>
                            </div>
                        :
                            <div className="doubleInintBtn">
                                <Button onClick={() => getClickedPosition()} type="primary">
                                    Initilize the Scale For Image 1
                                </Button>
                                <Button onClick={() => getClickedPositionSecondImage()} type="primary">
                                    Initilize the Scale For Image 2
                                </Button>
                            </div>
                        }
                    </div>
                    <div className="previewBackgroundImage">
                        <img src='http://localhost:8000/images/background.jpg' id="myImgId" width="600" height="600" alt="Scale Image" />
                    </div>
                </div>
            : 
            
                <Form
                    {...layout}
                    name="basic"
                    layout="horizontal"
                    initialValues={{ remember: true }}
                    onFinish={onFinishFinalCombination}
                    onFinishFailed={onFinishFailedCombination}
                    >  

                    <p style={{ fontSize: 16, marginLeft: '20%' }}>Give values between 0 to 500</p>

                    <Form.Item
                        label="Enter X"
                        name="x_value"
                        rules={[{ required: true, message: 'Please Enter X Coordinate!' }]}
                        >
                        <Input placeholder="Enter the X Coordinate" />
                    </Form.Item>

                    <Form.Item
                        label="Enter Y"
                        name="y_value"
                        rules={[{ required: true, message: 'Please Enter Y Coordinate!' }]}
                        >
                        <Input placeholder="Enter the Y Coordinate" />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Combine Images
                        </Button>
                    </Form.Item>

                </Form>

            }

            {completeCombine? 
                <>
                    <div className="outputImage">
                        <h3>Hey! Your Image is Ready</h3>
                        <img src='http://localhost:8000/output/final.png' width="600" height="600" alt='Output Image' /> 
                    </div>
                    <br />
                    <span style={{ marginTop: 50 }}>
                        <Button 
                            type="primary" 
                            shape="round" 
                            href="http://localhost:8000/output/final.png"
                            icon={<DownloadOutlined />} 
                            size='large'
                            target="_blank"
                            download="http://localhost:8000/output/final.png"
                            style={{ paddingTop: 0,}}
                            >
                            Download the Image
                            &nbsp;
                        </Button>
                    </span>
                </>
            : null}

        </Modal>

        {/* Black and White Modal */}
        <Modal
          title="Black and White Output"
          visible={visibleBlackAndWhiteTab}
          onOk={handleOkBlackAndWhiteTab}
          width={910}
          confirmLoading={confirmLoadingBlackAndWhiteTab}
          onCancel={handleCancelBlackAndWhiteTab}
        >
            <div style={{}}>
                {processingBWImage ? 
                    <div style={{ marginLeft: '40%', marginTop: 35 }}>
                        <Loader
                            type="Oval"
                            color="#044687"
                            height={100}
                            width={100}
                        />
                    </div>
                : 
                <>
                {showBWImageDownloadBtn ? null : 
                    <Button type="dashed" block onClick={ () => setShowNewGeneratedImage(!showNewGeneratedImage)}>
                        Load New Generated Image / Last Created Image
                    </Button>
                }
                {showNewGeneratedImage ?
                    <div>
                        {showBWImageDownloadBtn ?
                            <img 
                                src='http://localhost:8000/bwoutput/final.png'
                                alt="Output Image New" 
                                className="black_And_White_Preview_Image"
                            />
                        :
                            <img 
                                src='http://localhost:8000/output/final.png'
                                alt="Output Image" 
                                className="black_And_White_Preview_Image"
                            />
                        }
                        <div style={{ marginTop: '2%' }}>
                            {showBWImageDownloadBtn ? 
                                <Button 
                                    type="primary" 
                                    shape="round" 
                                    href="http://localhost:8000/bwoutput/final.png"
                                    icon={<DownloadOutlined />} 
                                    size='large'
                                    target="_blank"
                                    download="http://localhost:8000/bwoutput/final.png"
                                    style={{ paddingTop: 0,}}
                                    >
                                    Download the Image
                                </Button>
                            :
                                <Button type="primary" onClick={makeBlackAndWhiteFunc}>Make Black & White Image</Button>
                            }
                            
                        </div>
                    </div>
                :
                    null
                }
                </>
                }
            </div>
        </Modal>

        </div>
    );
}

export default Navbar;