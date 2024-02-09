import Accordion from 'react-bootstrap/Accordion';
import { RecentNotes } from './RecentNotes';
import { LikedNotes } from './LikedNotes';
import { CommentedNotes } from './CommentedNotes';
import { ViewedNotes } from './ViewedNotes';

function MasterDiv() {
  return (
    <Accordion className='masterDiv'>
      <Accordion.Item eventKey="0" style={{margin: '5vw 2vw', marginBottom: '2vw'}}>
        <Accordion.Header><span style={{width: '100%', textAlign:"center", fontSize: '2.5vw'}}>Most Recent Notes</span></Accordion.Header>
        <Accordion.Body>
          <RecentNotes />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" style={{margin: '0 2vw', marginBottom: '2vw'}}>
        <Accordion.Header><span style={{width: '100%', textAlign:"center", fontSize: '2.5vw'}}>Most Liked Notes</span></Accordion.Header>
        <Accordion.Body>
          <LikedNotes />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" style={{margin: '0 2vw', marginBottom: '2vw'}}>
        <Accordion.Header><span style={{width: '100%', textAlign:"center", fontSize: '2.5vw'}}>Most Commented Notes</span></Accordion.Header>
        <Accordion.Body>
          <CommentedNotes />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" style={{margin: '0 2vw', marginBottom: '5vw'}}>
        <Accordion.Header><span style={{width: '100%', textAlign:"center", fontSize: '2.5vw'}}>Most Viewed Notes</span></Accordion.Header>
        <Accordion.Body>
          <ViewedNotes />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default MasterDiv;