import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import ModalEditor from "../../components/ModalEditor";
import SEOChangeSelect from "../../components/SEOChangeSelect";
import SEOPrioritySelect from "../../components/SEOPrioritySelect";
import KeywordExistsAlert from "../../components/AlertExistingKeyword";
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {
    clearCurrentPage,
    removePage,
    savePage,
    selectCurrentLoading,
    selectCurrentPage,
    selectCurrentSaving
} from "./index";
import {ContentPage, Editable} from "b2b-types";
import {emptyPage} from "./api";
import {Alert, FormCheck, FormColumn, LoadingProgressBar} from "chums-components";

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
                setContent({...content, [field]: ev.target.checked, changed: true});
                return;
            default:
                setContent({...content, [field]: ev.target.value, changed: true});
        }
    }

    const selectChangeHandler = (field: keyof ContentPage) => (ev: ChangeEvent<HTMLSelectElement>) => {
        setContent({...content, [field]: ev.target.value, changed: true});
    }

    const textareaChangeHandler = (field: ModalEditorField) => (ev: ChangeEvent<HTMLTextAreaElement>) => {
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
                <FormColumn label="Keyword / Status" width={8}>
                    <div className="row g-3">
                        <div className="col-6">
                            <input type="text" value={content.keyword ?? ''} onChange={inputChangeHandler('keyword')}
                                   required className="form-control form-control-sm"/>
                        </div>
                        <div className="col-6">
                            <FormCheck type="checkbox" checked={!!content.status}
                                       onChange={inputChangeHandler('status')} label="Enabled"/>
                        </div>
                    </div>
                    <KeywordExistsAlert keyword={content.keyword ?? ''} id={content.id}/>
                </FormColumn>
                <FormColumn label="Title *" width={8}>
                    <input type="text" value={content.title ?? ''} onChange={inputChangeHandler('title')}
                           required className="form-control form-control-sm"/>
                </FormColumn>
                <FormColumn label="Subtitle" width={8}>
                    <input type="text" value={content.subtitle ?? ''} onChange={inputChangeHandler('subtitle')}
                           className="form-control form-control-sm"/>
                </FormColumn>
                <FormColumn label="Filename" width={8}>
                    <input type="text" value={content.filename ?? ''} onChange={inputChangeHandler('filename')}
                           className="form-control form-control-sm"/>
                </FormColumn>
                <FormColumn width={8} label="Page Content" className="mb-1">
                    <div className="input-group input-group-sm">
                        <textarea value={content.content ?? ''} onChange={textareaChangeHandler('content')}
                                  className="form-control form-control-sm" rows={5}/>
                        <button type="button" className="btn btn-outline-secondary"
                                onClick={() => onShowEditor('content')}>
                            <span className="bi-pencil-square"/>
                        </button>
                    </div>
                </FormColumn>
                <FormColumn label="Lifestyle Image" width={8}>
                    <input type="text" value={content.lifestyle ?? ''} onChange={inputChangeHandler('lifestyle')}
                           className="form-control form-control-sm"/>
                </FormColumn>
                <FormColumn label="Page CSS File" width={8}>
                    <input type="text" value={content.css ?? ''} onChange={inputChangeHandler('css')}
                           className="form-control form-control-sm"/>
                </FormColumn>
                <FormColumn label="Search Words" width={8}>
                    <input type="text" value={content.searchWords ?? ''} onChange={inputChangeHandler('searchWords')}
                           className="form-control form-control-sm"/>
                </FormColumn>
                <FormColumn width={8} label="SEO Description" className="mb-1">
                    <div className="input-group input-group-sm">
                        <textarea value={content.metaDescription ?? ''}
                                  onChange={textareaChangeHandler('metaDescription')}
                                  className="form-control form-control-sm" rows={5}/>
                        <button type="button" className="btn btn-outline-secondary"
                                onClick={() => onShowEditor('metaDescription')}>
                            <span className="bi-pencil-square"/>
                        </button>
                    </div>
                </FormColumn>
                <FormColumn width={8} label="SEO Changes / Priority">
                    <div className="row g-3">
                        <div className="col-6">
                            <SEOChangeSelect value={content.changefreq} onChange={selectChangeHandler('changefreq')}/>
                        </div>
                        <div className="col-6">
                            <SEOPrioritySelect value={content.priority} onChange={selectChangeHandler('priority')}/>
                        </div>
                    </div>
                </FormColumn>
                <FormColumn width={8} label={' '}>
                    <div className="row g-3">
                        <div className="col-auto">
                            <button type="submit" className="btn btn-sm btn-primary mr-1">Save</button>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-sm btn-outline-secondary mr-1"
                                    onClick={onNewPage}>
                                New Page
                            </button>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-sm btn-outline-danger mr-1"
                                    disabled={!content.id || content.changed}
                                    onClick={onDeletePage}>
                                Delete
                            </button>
                        </div>
                    </div>
                </FormColumn>
                {content.changed && <Alert color="warning" message="Don't forget to save your changes"/>}
            </form>
            {loading && <LoadingProgressBar animated striped/>}
            {showModalEditor &&
                <ModalEditor title={`edit product.${modalEditorField}`}
                             content={String(content[modalEditorField]) ?? ''}
                             onClose={onCloseEditor} onCancel={onCancelEditor}/>
            }
        </div>
    );
}

export default EditPage;
