import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button,Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { render } from '@testing-library/react';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
            

const RenderDish = ({dish}) => {
    
    if (dish != null)
    return(
        <Card>
             <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle><h3><b>{dish.name}</b></h3></CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
    else
    return(
        <div></div>
    );

  }

  const RenderComments = ({comments, postComment, dishId}) => {
    console.log(comments);
    if (comments != null && comments != undefined)
    {
        const comment = comments.map((feedback) => {
            return (
                <div>
                    <div className="row"> 
                        <div   className="col-lg-12 col-md-12 m-1"> {feedback.comment} </div>
                    </div>
                    <div className='row'>
                        <div   className="col-lg-12 col-md-12 m-1"> -- {feedback.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(feedback.date)))} </div>
                    </div>
            </div>
            );
        });

        return (
            <div>
                    <Card className="border-0">
                        <CardBody>
                        <CardTitle><h3><b>Comments</b></h3></CardTitle>
                        <CardText> 
                        <div>{comment}</div>
                        <div className="row">
                            
                        </div>
                        </CardText>
                        </CardBody>
                   </Card>
                   <CommentForm dishId={dishId} postComment={postComment} />
            </div>
                    

        );
    }
    else
    {
        return ( <div></div> );   
    }
    
  }

class CommentForm extends Component {

    constructor(props) {
        super(props);
       
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false,
          touched: {
            rating: false,
            author: false,
            comment: false
        }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
        
        
      }
    
      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleCommentFormSubmit(values){
        this.toggleModal();
        // this.props.addComment(this.props.dishId, values.rating, values.author, values.comment); 
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
      }


      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
      handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    

      validate( rating,author, comment) {
        const errors = {
          rating: '',
          author: '',
          comment: ''
      };
      errors.rating = "";
      errors.comment = "";
      if (this.state.touched.author && author.length < 3)
          errors.author = 'Must be greater than 2 characters';
      else if (this.state.touched.author && author.length > 15)
          errors.author = 'Must be 15 chars or less';

          return errors;
  }
  
      render(){
        const errors = this.validate(this.state.rating, this.state.author, this.state.comment);

            return(
                <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>
                {/* rating */}
                <Row className="form-group">
                    <Label htmlFor="rating" md={12} >Rating</Label>
                    <Col md={12}>
                        <Control.select model=".rating"
                            className="form-control"
                            name="rating"
                            id="rating"
                            validators={{
                                required
                            }}
                        >
                            <option>Please Select</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        <Errors
                            className="text-danger"
                            model=".rating"
                            show="touched"
                            messages={{
                                required: 'Required',
                            }}
                        />
                    </Col>
                </Row>
                {/* author */}
                <Row className="form-group">
                    <Label htmlFor="author" md={12}> Your Name </Label>
                    <Col md={12}>
                        <Control.text model=".author" id="author" name="author"
                            placeholder="First Name"
                            className="form-control"
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(15)
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }}
                        />
                    </Col>
                </Row>
                {/* comment */}
                <Row className="form-group">
                    <Label htmlFor="comment" md={12}>Comment</Label>
                    <Col md={12}>
                        <Control.textarea model=".comment" id="comment" name="comment"
                            rows="6"
                            className="form-control"
                            validators={{
                                required
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".comment"
                            show="touched"
                            messages={{
                                required: 'Required',
                            }}
                        />
                    </Col>
                
                </Row>
                {/* submit button */}
                <Row className="form-group">
                    <Col>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </Col>
                </Row>
                </LocalForm>
                </ModalBody>
              </Modal>
            </div>
                )
      }

}

const Dishdetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
    {
    return (
        <div className="container">
            
             <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
            <div className="row">
              <div  className="col-lg-5 col-md-5 m-1">
                <RenderDish dish={props.dish}/>
              </div>
              <div  className="col-lg-5 col-md-5 m-1">
                {console.log(props.comments)}
                <RenderComments comments = { props.comments } postComment={props.postComment}  dishId={props.dish.id} />
              </div>
             
            </div>
        </div>
    )
    }
    else
    {
        return(<div></div>)
    }
}
  
export default Dishdetail;