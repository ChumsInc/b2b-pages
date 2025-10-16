import {type ChangeEvent, type FormEvent, useEffect, useState} from 'react';
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
import type {ContentPage, Editable} from "b2b-types";
import {emptyPage} from "./api";
import Alert from 'react-bootstrap/Alert'
import {ProgressBar} from "react-bootstrap";
import KeywordInput from "./components/KeywordInput";
import PageStatus from "./components/PageStatus";
import PageFormControl from "./components/PageFormControl";
import PageTextArea from "./components/PageTextArea";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageFormGroup from "./components/PageFormGroup";
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

    useEffect(() => {
        setContent({...(currentPage ?? emptyPage)})
    }, [currentPage, loading, saving]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
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
        <div>
            <h4>Edit{' '}
                {!!content.keyword && (
                    <small>(
                        <a href={`https://b2b.chums.com/pages/${content.keyword}`}
                           target="_blank">preview</a> {!content.status && 'in dev mode'})
                    </small>
                )}
            </h4>
            <form onSubmit={submitHandler} className="my-3">
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
                <PageFormControl label="Filename" value={content.filename ?? ''}
                                 onChange={inputChangeHandler('filename')}/>
                <PageTextArea label="Page Content" value={content.content ?? ''}
                              disabled={!!content.filename}
                              onChange={inputChangeHandler('content')}
                              canZoom onZoom={() => onShowEditor('content')}/>
                <PageFormControl label="Lifestyle Image" value={content.lifestyle ?? ''}
                                 onChange={inputChangeHandler('lifestyle')}/>
                <PageFormControl label="Page CSS File" value={content.css ?? ''} onChange={inputChangeHandler('css')}/>
                <PageFormControl label="Search Words" value={content.searchWords ?? ''}
                                 onChange={inputChangeHandler('searchWords')}/>
                <PageTextArea label="SEO Description"
                              value={content.metaDescription ?? ''} onChange={inputChangeHandler('metaDescription')}
                              canZoom onZoom={() => onShowEditor('metaDescription')}
                />
                <PageSEOOptions label="SEO Changes / Priority"
                                slots={{
                                    changes: {value: content.changefreq, onChange: selectChangeHandler('changefreq')},
                                    priority: {value: content.priority, onChange: selectChangeHandler('priority')}
                                }}
                />
                <hr/>
                <PageFormGroup label={' '}>
                    <Col>
                        <Row gap={3}>
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
                    </Col>
                </PageFormGroup>
                {content.changed && <Alert variant="warning">Don't forget to save your changes"</Alert>}
            </form>
            {loading && <ProgressBar animated striped/>}
            {showModalEditor &&
                <ModalEditor title={`edit product.${modalEditorField}`}
                             content={String(content[modalEditorField]) ?? ''}
                             onClose={onCloseEditor} onCancel={onCancelEditor}/>
            }
        </div>
    );
}

export default EditPage;
