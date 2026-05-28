import {type ChangeEvent, startTransition, useEffect, useId, useState} from 'react';
import ModalEditor from "../../components/ModalEditor";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {
    clearCurrentPage,
    removePage,
    savePage,
    selectCurrentLoading,
    selectCurrentPage,
    selectCurrentSaving
} from "./index";
import type {ContentPage, Editable} from "chums-types/b2b";
import {emptyPage} from "./api";
import Alert from 'react-bootstrap/Alert'
import {ProgressBar} from "react-bootstrap";
import KeywordInput from "./components/KeywordInput";
import PageStatus from "./components/PageStatus";
import PageFormControl from "./components/PageFormControl";
import PageTextArea from "./components/PageTextArea";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageSEOOptions from "./components/PageSEOOptions";
import Button from "react-bootstrap/Button";

type ModalEditorField = keyof Pick<ContentPage, 'content' | 'metaDescription'>

const EditPage = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector(selectCurrentPage);
    const [content, setContent] = useState<ContentPage & Editable>({...(currentPage ?? emptyPage)});
    const loading = useAppSelector(selectCurrentLoading);
    const saving = useAppSelector(selectCurrentSaving);
    const [showModalEditor, setShowModalEditor] = useState(false);
    const [modalEditorField, setModalEditorField] = useState<ModalEditorField>('content');
    const idSEOChanges = useId();
    const idPriority = useId();

    useEffect(() => {
        startTransition(() => {
            setContent({...(currentPage ?? emptyPage)})
        })
    }, [currentPage, loading, saving]);

    const submitHandler = (arg: FormData) => {
        console.log(Array.from(arg.keys()).map(k => `${k}=${arg.get(k)}`).join('\n'));
        if (!content.keyword) {
            return;
        }
        dispatch(savePage(content));
    }

    const inputChangeHandler = (field: keyof ContentPage) => (ev: ChangeEvent<HTMLInputElement>) => {
        switch (field) {
            case 'priority':
                setContent({...content, [field]: ev.target.valueAsNumber, changed: true});
                return;
            case 'status':
            case 'requiresLogin':
                setContent({...content, [field]: ev.target.checked, changed: true});
                return;
            default:
                setContent({...content, [field]: ev.target.value, changed: true});
        }
    }

    const selectChangeHandler = (field: keyof ContentPage) => (ev: ChangeEvent<HTMLSelectElement>) => {
        setContent({...content, [field]: ev.target.value, changed: true});
    }

    const onCloseEditor = (value: string) => {
        setContent({...content, [modalEditorField]: value, changed: true});
        setShowModalEditor(false);
    }

    const onCancelEditor = () => {
        setShowModalEditor(false);
    }

    const onShowEditor = (editorField: ModalEditorField) => {
        setModalEditorField(editorField);
        setShowModalEditor(true);
    }
    const onDeletePage = () => {
        if (!content.changed && window.confirm(`Are you sure you want to delete page '${content.keyword}'`)) {
            dispatch(removePage(content));
        }
    }

    const onNewPage = () => {
        dispatch(clearCurrentPage());
    }

    return (
        <>
            <div className="container">
                <h4>Edit{' '}
                    {!!content.keyword && (
                        <small>(
                            <a href={`https://b2b.chums.com/pages/${content.keyword}`}
                               target="_blank">preview</a> {!content.status && 'in dev mode'})
                        </small>
                    )}
                </h4>
                <form action={submitHandler} className="my-3">
                    <KeywordInput pageId={content.id} value={content.keyword ?? ''}
                                  onChange={inputChangeHandler('keyword')}/>
                    <PageStatus slots={{
                        status: {checked: content.status, onChange: (inputChangeHandler('status'))},
                        requiresLogin: {
                            checked: content.requiresLogin ?? false,
                            onChange: (inputChangeHandler('requiresLogin'))
                        },
                    }}/>
                    <PageFormControl label="Title" value={content.title ?? ''} onChange={inputChangeHandler('title')}
                                     required/>
                    <PageFormControl label="Subtitle" value={content.subtitle ?? ''}
                                     onChange={inputChangeHandler('subtitle')}/>
                    <PageFormControl label="Redirect" value={content.redirectTo ?? ''}
                                     onChange={inputChangeHandler('redirectTo')}
                                     placeholder="enter keyword for redirect"
                                     helpText="If the current page is disabled, this helps to redirect to this page. If blank, it will redirect to the home page."/>
                    <PageFormControl label="Filename" value={content.filename ?? ''}
                                     onChange={inputChangeHandler('filename')}/>
                    <PageTextArea label="Page Content" value={content.content ?? ''}
                                  disabled={!!content.filename}
                                  onChange={inputChangeHandler('content')}
                                  canZoom onZoom={() => onShowEditor('content')}/>
                    {/*<PageFormControl label="Lifestyle Image" value={content.lifestyle ?? ''}*/}
                    {/*                 onChange={inputChangeHandler('lifestyle')}/>*/}
                    {/*<PageFormControl label="Page CSS File" value={content.css ?? ''}*/}
                    {/*                 onChange={inputChangeHandler('css')}/>*/}
                    <PageFormControl label="Search Words" value={content.searchWords ?? ''}
                                     onChange={inputChangeHandler('searchWords')}/>
                    <PageTextArea label="SEO Description"
                                  value={content.metaDescription ?? ''} onChange={inputChangeHandler('metaDescription')}
                                  canZoom onZoom={() => onShowEditor('metaDescription')}
                    />
                    <PageSEOOptions label={(<div><label htmlFor={idSEOChanges}>SEO Changes</label> / <label
                        htmlFor={idPriority}>Priority</label></div>)}
                                    slots={{
                                        changes: {
                                            value: content.changefreq,
                                            onChange: selectChangeHandler('changefreq'),
                                            id: idSEOChanges,
                                        },
                                        priority: {
                                            value: content.priority,
                                            onChange: selectChangeHandler('priority'),
                                            id: idPriority
                                        },
                                    }}
                    />
                    <hr/>
                    <Row className="align-items-center justify-content-end" gap={3}>
                        <Col xs="auto">
                            <Button type="submit" variant="primary" size="sm">Save</Button>
                        </Col>
                        <Col xs="auto">
                            <Button type="button" variant="outline-secondary" size="sm" onClick={onNewPage}>New
                                Page</Button>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" variant="outline-danger" size="sm"
                                    disabled={!content.id || content.changed}
                                    onClick={onDeletePage}>Delete</Button>
                        </Col>
                    </Row>
                    {content.changed && <Alert variant="warning">Don't forget to save your changes"</Alert>}
                </form>
                {loading && <ProgressBar animated striped/>}
            </div>
            <ModalEditor title={`${content.keyword} :: ${modalEditorField}`} show={showModalEditor}
                         editDisabled={!!content.filename}
                         content={content[modalEditorField] ?? ''}
                         onClose={onCloseEditor} onCancel={onCancelEditor}/>
        </>
    );
}

export default EditPage;
