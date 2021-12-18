import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Col, Container, Dropdown, DropdownButton, Modal, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function App() {
  const [show, setShow] = useState(true);
  const [customizeShow, setCustomizeShow] = useState(true);
  const [accordian, setAccordian] = useState([]);

  useEffect(() => {
    fetch('https://619b61042782760017445573.mockapi.io/api/v1/getBanner/1')
    .then(response => response.json())
    .then(data => setAccordian(data.accordian))
    .catch(err => console.error(err));
  }, [])

  const toggleSwitchMain= (onOfState, whichAccordian) => {
    const newAccordianData = accordian.map((item)=>{
      if(item.CategoyId === whichAccordian){
        item.IsMandatory = onOfState;
      }
      return(
        item
      )
    })
    setAccordian(newAccordianData);
  }

  const toggleSwitchPlugin= (onOfState, whichPlugin) => {
    const newAccordianData = accordian.map((item)=>{
        item.PluginList.map(plugin=>{
          if(plugin.ComplianceTypeID === whichPlugin){
            plugin.BlockingEnabled = onOfState;
          }
          return plugin;
        })
      return(
        item
      )
    })
    setAccordian(newAccordianData);
  }
  
  
  console.log(accordian)
  // const [isChecked, setIsChecked] = useState(true);
  // var toggleOnOf = (e) =>{
  //   setIsChecked(!isChecked);
  // }
  // useEffect(() => {
  //   let item = `
  //   <div class='switch-parent' onclick="${() =>toggleOnOf()}">
  //     <div class='position-relative'>
  //       <div class='${isChecked? "custom-switch-on":"custom-switch-off"} rounded-pill'>
  //         <div class='custom-slider'></div>
  //       </div>
  //     </div>
  //   </div>`
  //   let toggleButton = document.createElement('div');
  //   toggleButton.innerHTML = item
  //   document.querySelectorAll('.accordion-item').forEach(item=>{
  //     item.insertAdjacentElement("afterbegin", toggleButton)
  //   });
  // },[isChecked])

  

  return (
    <Container fluid>
        <>         
          <Modal
            show={show}
            onHide={() => setShow(true)}
            dialogClassName="90%"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton className='bg-white border-0 p-3'></Modal.Header>

            <Modal.Body>
              <div className='modal-main-content py-2 px-4 px-md-5 bg-white'>
                <h1 className='fw-bolder'>Can we store cookies?</h1>
                <p>
                We and our partners use technologies, such as cookies, and process personal data, such as
                IP addresses and cookies identifiers, to personalize ads and content based on your interests,
                measure the performance of ads and content, and derive insights about the audiences who saw ads
                and contents.
                </p>
                <p>
                  Click below to consent to the use of this technology and the processing of your personal data
                  for this purposes. You can change your mind and change your consent choices at any time by
                  returning to this site.
                </p>
                <p>
                  You can familiarize with our <a href="/" className='text-dark fw-bold'>Privacy Policy</a>
                </p>
                <div className="d-flex flex-column flex-md-row gap-2 gap-md-0 justify-content-between my-5">
                  <div className='d-flex flex-column flex-md-row gap-2 gap-md-0'>
                    <button className='btn me-1 me-md-2 text-white p-1 py-md-2 px-md-4' style={{backgroundColor: '#24B04B'}}>Accept All</button>
                    <button className='btn border border-1 p-1 py-md-2 px-md-4'>Save Settings</button>
                  </div>
                  <button className='btn p-1 py-md-2 px-md-4 d-flex align-items-center justify-content-center gap-2' onClick={()=> setCustomizeShow(!customizeShow)}><span>Customize</span> <i className={`fas ${customizeShow ? 'fa-sort-up mt-1' : 'fa-sort-down mb-1'}`}></i></button>
                </div>
              </div>
              {
                customizeShow &&
                <div className='bg-white rounded-3 m-2 m-md-5 p-2 position-relative'>
                  <Accordion defaultActiveKey="0" flush>
                    {
                      accordian.length
                      ?
                      <>
                        {
                          accordian.map((item, index)=>{
                            return(
                              <Accordion.Item eventKey={index.toString()} key={item.CategoyId}>
                                <div className="switch-parent">
                                    <div className="position-relative">
                                      <div className={item.IsMandatory ? 'custom-switch-on rounded-pill' :'custom-switch-off rounded-pill'} onClick={()=>toggleSwitchMain(!item.IsMandatory, item.CategoyId)}>
                                        <div className='custom-slider'></div>
                                      </div>
                                    </div>
                                  </div>
                                <Accordion.Header>
                                  <span className='fw-bolder' style={{marginLeft:'60px'}}>{item.CategoyHeading}</span>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <p>{item.CategoyText}</p>
                                  <Row className='mb-3'>
                                    <Col xs={4}>
                                      <span className='fw-bolder'>Plugins</span>
                                    </Col>
                                    <Col xs={8} className='ps-5 ps-md-0'>
                                      <p className='fw-bolder mb-0'>Block/Enable</p>
                                    </Col>
                                  </Row>
                                  <div className='d-flex flex-column'>
                                    {
                                      item.PluginList.map((plugin, i)=>{
                                        return(
                                          <Row key={i}>
                                            <Col xs={4}>
                                              <p>{plugin.ComplianceType}</p>
                                            </Col>
                                            <Col xs={8} className='ps-5 ps-md-0'>
                                              <Row xs={1} md={2} className='mb-3 mb-md-0'>
                                                <Col>
                                                  <div className={plugin.BlockingEnabled ? 'custom-switch-off rounded-pill' :'custom-switch-on rounded-pill'} onClick={()=>toggleSwitchPlugin(!plugin.BlockingEnabled,plugin.ComplianceTypeID)}>
                                                    <div className='custom-slider'></div>
                                                  </div>
                                                </Col>
                                                <Col className='my-2 my-md-0'>
                                                  <a className='text-black' href={plugin.optOutExternalLink ? plugin.optOutExternalLink : "#"}>Go to site</a>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Row>
                                        )
                                      })
                                    }
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            )
                          })
                        }
                      </>
                      :
                      <div style={{height:'200px', display:'grid', placeContent:'center'}}>
                        <Spinner animation="border" />
                      </div>
                    }
                  </Accordion>
                </div>
              }
            </Modal.Body>
          </Modal>
        </>
    </Container>
  );
}

export default App;
