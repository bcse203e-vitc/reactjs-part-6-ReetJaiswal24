import React, { useState, useEffect } from 'react';

const SkillSelection = ({ onSelectSkill }) => {
  const [skills] = useState(['Web Development', 'Data Science', 'Cybersecurity']);
  const [selectedSkill, setSelectedSkill] = useState('');

  const handleSkillSelection = (skill) => {
    setSelectedSkill(skill);
    onSelectSkill(skill);
  };

  return (
    <div>
      <h2>Select a Skill to Learn</h2>
      {skills.map((skill) => (
        <button key={skill} onClick={() => handleSkillSelection(skill)}>
          {skill}
        </button>
      ))}
      {selectedSkill && <p>Selected Skill: {selectedSkill}</p>}
    </div>
  );
};

const Roadmap = ({ selectedSkill }) => {
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    if (selectedSkill) {
      const roadmapData = [
        { title: 'Intro to HTML', task: 'Complete HTML basics tutorial' },
        { title: 'Intro to CSS', task: 'Complete CSS styling tutorial' },
        { title: 'JavaScript Basics', task: 'Learn JavaScript fundamentals' },
      ];
      setRoadmap(roadmapData);
    }
  }, [selectedSkill]);

  return (
    <div>
      <h2>Learning Roadmap for {selectedSkill}</h2>
      <ul>
        {roadmap.map((item, index) => (
          <li key={index}>
            <h4>{item.title}</h4>
            <p>{item.task}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProgressTracker = () => {
  const [progress, setProgress] = useState(0);

  const handleCompleteTask = () => {
    if (progress < 100) {
      setProgress(progress + 20); 
    }
  };

  return (
    <div>
      <h2>Learning Progress</h2>
      <p>Progress: {progress}%</p>
      <button onClick={handleCompleteTask}>Mark Task as Complete</button>
      <div style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '10px',
            backgroundColor: '#76c7c0',
          }}
        />
      </div>
    </div>
  );
};

const Quizzes = () => {
  const questions = [
    { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
    { question: 'What is the capital of France?', options: ['Berlin', 'Paris', 'Madrid'], answer: 'Paris' },
  ];

  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswer = (questionIndex, selectedOption) => {
    setSelectedAnswers(prev => {
      const updatedAnswers = [...prev];
      updatedAnswers[questionIndex] = selectedOption;
      return updatedAnswers;
    });

    if (selectedOption === questions[questionIndex].answer) {
      setScore(score + 1);
    }
  };

  return (
    <div>
      <h2>Interactive Quiz</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(index, option)}
              disabled={selectedAnswers[index] !== undefined}
            >
              {option}
            </button>
          ))}
        </div>
      ))}
      <h3>Your Score: {score} / {questions.length}</h3>
    </div>
  );
};


const Community = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div>
      <h2>Community Discussion</h2>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

const Certificate = ({ userName, skill }) => {
  const [showCertificate, setShowCertificate] = useState(false);

  const generateCertificate = () => {
    setShowCertificate(true);
  };

  const handleDownload = () => {
    alert(`Certificate generated for ${userName} on completing ${skill}`);
  };

  return (
    <div>
      <h2>Completion Certificate</h2>
      <button onClick={generateCertificate}>Preview Certificate</button>
      <button onClick={handleDownload}>Download Certificate</button>

      {showCertificate && (
        <div style={{ marginTop: '20px', padding: '20px', border: '2px solid black' }}>
          <h3>Certificate of Completion</h3>
          <p>This certifies that</p>
          <h4>{userName}</h4>
          <p>Has completed the course on {skill}</p>
          <p>Issued on: {new Date().toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [userName] = useState('Reet Jaiswal');

  return (
    <div>
      <h1>Personalized Learning Pathway</h1>
      <SkillSelection onSelectSkill={setSelectedSkill} />
      {selectedSkill && (
        <>
          <Roadmap selectedSkill={selectedSkill} />
          <ProgressTracker />
          <Quizzes />
          <Community />
          <Certificate userName={userName} skill={selectedSkill} />
        </>
      )}
    </div>
  );
};

export default App;

