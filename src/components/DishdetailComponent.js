import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

  
    function RenderDish({dish}) {
    
        if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
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
  
      function RenderComments({feedback}) {
        console.log(feedback);
        if (feedback != null && feedback != undefined)
        {
            const comments = feedback.comments.map((feedback) => {
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
                
                        <Card className="border-0">
                            <CardBody>
                            <CardTitle><h3><b>Comments</b></h3></CardTitle>
                            <CardText> {comments}</CardText>
                            </CardBody>
                       </Card>
    
            );
        }
        else
        {
            return ( <div></div> );   
        }
        
      }

const Dishdetail  = (props) => {

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
                <RenderComments feedback={ props.dish }/>
              </div>
            </div>
        </div>
    );
}
export default Dishdetail;