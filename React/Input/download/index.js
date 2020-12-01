import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import downloadIcon from '../../../assets/img/file.svg';
import { declOfNum } from '../../helpers';
import { COLORS } from '../../../assets/js/constants';

let DownloadContainer = styled.div`
    padding-bottom: 8px;
    cursor: pointer;
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
`;
let DownloadLogo = styled.img`
    width: 17px;
    height: 22px;
`;
let DownloadText = styled.div`
    padding-left: 7px;
    font-size: 16px;
    line-height: 24px;
    color: ${COLORS.blue};
`;
let DownloadHint = styled.div`
    font-size: 16px;
    line-height: 24px;
    color: ${COLORS.grey};
    padding-bottom: 27px;
`;
let Files = styled.div`
    flex-direction: column;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 27px;
`;
let File = styled.div`
    font-size: 14px;
    flex-direction: column;
    line-height: 18px;
    color: ${COLORS.darkGrey};
    :first-child {
        padding-top: 8px;
    }
`;
let FileName = styled.span`
    color: ${COLORS.black};
`;
let FileSize = styled.span`
    font-size: 12px;
`;
let TextContainer = styled.div`
    margin-bottom: 20px;
`;
let ImagePreview = styled.div`
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    background: url(${props => props.srcBackground}) center no-repeat;
    background-size: cover;
`;
let PreviewContainer = styled.div`
    flex-direction: column;
    :not(:last-child) {
        ::after {
            content: "";
            margin: 15px 0 15px -15px;
            width: 100%;
            padding-left: 10px;
            border-bottom:1px solid ${COLORS.grey};
            @media (max-width: 859px) {
                margin: 15px 0 15px 0;
                padding-left: 0;
            }
        }
    }
`;
let Row = styled.div`
    align-items: center;
    flex-direction: row;
    position: relative;
    flex-wrap: nowrap;
`;
let DeleteFile = styled.div`
    position: absolute;
    right: 10px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    ::before, ::after {
        content: '';
        position: absolute;
        top: 7px;
        left: 7px;
        height: 8px;
        width: 2px;
        background-color: ${COLORS.red};
        transform: rotate(45deg);
    }
    ::after {
        transform: rotate(-45deg);
    }
`;
let DragNDropArea = styled.div`
    z-index: 1;
    pointer-events: none;
    width: 0;
    height: 0;
    margin: 55px 15px;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    ${props => props.isDrag && css`
        opacity: 0.9;
        width: 91vw;
        height: 88vh;
        border-radius: 5px;
        border: 1px dashed ${COLORS.darkGrey};
        background-color: ${COLORS.grey};
    `}
`;
let TextDragArea = styled.div`
    color: ${COLORS.black};
    font-size: 32px;
`;
let ErrorMessage = styled.p`
    font-size: 12px;
    line-height: 2em;
    margin: 0;
    color: ${COLORS.red};
    transition: opacity 0.2s ease-in-out;
`;
// счетчик для обхода вечного вызова dragenter&dragleave
let dragCounter = 0;

class Download extends PureComponent {

    static defaultProps = {
        onChange: () => {},
        allowedTypes: [
            'image/png',
            'image/jpeg'
        ],
        typesForError: 'png, jpeg',
    }

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            drag: false,
            errorMessage: '',
        };
    }

    componentDidMount() {
        let { previousFiles = [] } = this.props;
        if (previousFiles.length > 0) {
            this.setState({
                files: previousFiles
            });
        }
        if (process.browser) {
            window.addEventListener('dragenter', this.handleDragIn);
            window.addEventListener('dragleave', this.handleDragOut);
            window.addEventListener('dragover', this.handleDrag);
            window.addEventListener('drop', this.handleDrop);
        }
    }

    componentWillUnmount() {
        if (process.browser) {
            window.removeEventListener('dragenter', this.handleDragIn);
            window.removeEventListener('dragleave', this.handleDragOut);
            window.removeEventListener('dragover', this.handleDrag);
            window.removeEventListener('drop', this.handleDrop);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.files !== prevState.files) {
            this.props.onChange(this.state.files);
        }
    }

    // блокируем дефолтные действия браузера по событию
    preventBrowserEvents = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrag = (e) => {
        this.preventBrowserEvents(e);
    }

    // если курсор с файлом попал в область отслеживания - показываем плашку
    handleDragIn = (e) => {
        this.preventBrowserEvents(e);
        dragCounter++;

        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({
                drag: true
            });
        }
    }

    // если вышли из области - прекращаем отображать плашку
    handleDragOut = (e) => {
        this.preventBrowserEvents(e);
        dragCounter--;

        if (dragCounter > 0) return;
        this.setState({
            drag: false
        });
    }

    // по событию отжатия принимаем файлы
    handleDrop = (e) => {
        this.preventBrowserEvents(e);

        this.setState({
            drag: false
        });
        this.handleFilesChange(e.dataTransfer.files);
        dragCounter = 0;
    }

    addFiles = (files) => {
        this.setState(prevState => ({
            files: prevState.files.concat(files),
        }));
    };

    setErrorMessage = (value) => {
        this.setState({
            errorMessage: value
        });
    }

    // проверка во избежание повторной загрузки файла
    checkIntersections = (file) => {
        for (let i = 0, fileState; (fileState = this.state.files[i]); i++) {
            if (file.name === fileState.name && file.size === fileState.size) {
                return true;
            }
        }
        return false;
    }

    handleFilesChange = (files) => {
        let filesToAdd = [];
        for (let i = 0, file; (file = files[i]); i++) {

            if (this.props.allowedTypes.includes(file.type)) {
                if (this.checkIntersections(file)) {
                    this.setErrorMessage(`Файл ${file.name} уже загружен`);
                } else {
                    filesToAdd.push(file);
                    this.setErrorMessage('');
                }
            } else {
                this.setErrorMessage(`Допустимые расширения: ${this.props.typesForError}`);
            }
        }
        this.state.files.length + filesToAdd.length < 6 ? this.addFiles(filesToAdd)
            : this.setErrorMessage('Максимальное количество файлов: 5');
    };

    deleteFile = (indexToDelete) => {
        this.setErrorMessage('');
        this.setState(prevState => ({
            files: prevState.files.filter((file, index) => (index !== indexToDelete)),
        }));
    };

    // преобразование единиц измерения размера файла
    convertFileSize = (bytes) => {
        const k = 1024;
        const sizesNames = ['б', 'кБ', 'мБ'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / k ** i)).toFixed(2) + ' ' + sizesNames[i];
    }

    render() {
        let { files, drag, errorMessage = '' } = this.state;
        let { text, hint, ...attrs } = this.props;
        attrs.onChange = event => this.handleFilesChange(event.target.files);
        return (
            <React.Fragment>
                <DragNDropArea isDrag={drag}>
                    <TextDragArea>Перетащите файл</TextDragArea>
                </DragNDropArea>
                <DownloadContainer>
                    <input
                        type='file'
                        name='files[]'
                        multiple
                        display={!(files.length > 5)}
                        onChange={(event) => this.handleFilesChange(event.target.files)}
                        accept={this.props.allowedTypes.join(', ')}
                        {...attrs}
                    />
                    <DownloadLogo src={downloadIcon}/>
                    <DownloadText disabled={files.length > 5}>{text}</DownloadText>
                </DownloadContainer>
                {
                    hint ? <DownloadHint>{hint}</DownloadHint> : null
                }
                {
                    errorMessage.length > 0 ? <ErrorMessage>{errorMessage}</ErrorMessage> : null
                }
                {
                    files.length
                        ? <Files>
                            <TextContainer>{`Вы загрузили ${files.length} ${declOfNum(['файл', 'файла', 'файлов'])(files.length)}`}</TextContainer>
                            {
                                files.map((file, index) =>
                                    <PreviewContainer key={index}>
                                        <Row>
                                            <ImagePreview srcBackground={URL.createObjectURL(file)}/>
                                            <File>
                                                <FileName>{file.name}</FileName>
                                                <FileSize>{this.convertFileSize(file.size)}</FileSize>
                                            </File>
                                            <DeleteFile onClick={() => this.deleteFile(index)}/>
                                        </Row>
                                    </PreviewContainer>)
                            }
                        </Files> : null
                }
            </React.Fragment>
        );
    }
}

export default Download;
