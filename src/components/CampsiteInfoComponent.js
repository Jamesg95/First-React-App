import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, Label, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form'

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
            console.log('Current state is: ' + JSON.stringify(values));
            alert('Current state is: ' + JSON.stringify(values));
            this.toggleModal();
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
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name}/>
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    };

    function RenderComments({comments}) {
        if(comments) {
            return(
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    {comments.map(comment => 
                        <div key={comment.id} className='m-2'>
                            {comment.text}
                            <br />
                            --{comment.author}, {new Intl.DateTimeFormat('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: '2-digit'})
                                .format(new Date(Date.parse(comment.date)))}
                        </div>
                    )}
                    <CommentForm />
                </div>
            )
        } 
        return <div />
    }

    function CampsiteInfo(props){
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            )
        } else {
            return <div></div>
        }
    }

export default CampsiteInfo;

