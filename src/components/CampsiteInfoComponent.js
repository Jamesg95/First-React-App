import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, Label, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    class CommentForm extends Component {
        constructor(props){
            super(props)

            this.state = {
                isModalOpen: false
            }
        }
        
        toggleModal = () => {
            this.setState((prev) => ({isModalOpen: !prev.isModalOpen}))
        }
        
        handleSubmit = (values) => {
            this.toggleModal();
            this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text)
        }

        render() {
            const required = val => val && val.length;
            const maxLength = len => val => !val || (val.length <= len);
            const minLength = len => val => val && (val.length >= len);

            return (
                <div>
                    <Button onClick={this.toggleModal} outline><i className='fa fa-pencil'/>Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>  
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <Row className='form-group'>
                                    <Col>
                                        <Label htmlfor='rating'>Rating</Label>
                                        <Control.select id='rating' model='.rating' className='form-control'>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Col>
                                        <Label htmlfor='author'>Your Name</Label>
                                            <Control.text id='author' model='.author' className='form-control'
                                            validators={{
                                                required, 
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}
                                            />
                                            <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Col>
                                        <Label htmlfor='text'>Comment</Label>
                                        <Control.textarea id='text' model='.text' rows='6' className='form-control'/>
                                    </Col>
                                </Row>
                                <ModalFooter>
                                    <Button color='primary' type='submit'>Submit</Button>
                                </ModalFooter>
                            </LocalForm>
                        </ModalBody> 
                    </Modal>
                </div>

            )
        }
    }


    function RenderCampsite({campsite}) {
        return(
            <div className='col-md-5 m-1'>
                <FadeTransform  in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + campsite.image} alt={campsite.name}/>
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                
            </div>
        )
    };

    function RenderComments({comments, postComment, campsiteId}) {
        if(comments) {
            return(
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    <Stagger in>
                    {comments.map(comment => { 
                        return (<Fade in key={comment.id} >
                            <div className='m-2'>
                                {comment.text}
                                <br />
                                --{comment.author}, {new Intl.DateTimeFormat('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: '2-digit'})
                                    .format(new Date(Date.parse(comment.date)))}
                            </div>
                        </Fade>
                        ) 
                    })}
                    </Stagger>
                    <CommentForm campsiteId={campsiteId} postComment={postComment} />
                </div>
            )
        } 
        return <div />
    }

    function CampsiteInfo(props){
        if(props.isLoading) {
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        if(props.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            )
        }
        if(props.campsite) {
            return(
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/directory'>Directory</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.campsite.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments} 
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
            )
        } else {
            return <div></div>
        }
    }

export default CampsiteInfo;

