// Import packages.
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Header, Form, Dropdown } from 'semantic-ui-react';

function Democrasee() {
    // Initialize state variables.
    const [output, setOutput] = useState('');
    const [input, setInput] = useState('Explain in casual terms as if you were talking with a student from elementary school how conservatives view climate change.');
    const [manner, setManner] = useState('casual');
    const [level, setLevel] = useState('elementary school');
    const [perspective, setPerspective] = useState('conservative');
    const [topic, setTopic] = useState('climate change');

    // Initialize POST request after form submission.
    const handleSubmit = (event) => {
        axios
            .post(`http://localhost:${process.env.REACT_APP_API_PORT}/`, {input})
            .then(res => setOutput(res.data))
            .catch(error => {console.log(error)});
    }
    
    return (
        <Container text textAlign="center" style={{margin: "2rem 0rem 2rem 0rem"}}>
            <Header as='h1' content='🏛️ DemocraSee 👀' />
            <Header as='h2' content='↪️ See the Other Side ↩️' />
            <Form onSubmit={handleSubmit} style={{margin: "3rem 0rem 2rem 0rem"}}>
                <Header as='h3' content='🟥 Perspective 🟦' />
                <Dropdown
                defaultValue='conservative'
                fluid
                selection
                options={[
                    {text: 'Conservative', value: 'conservative'}, 
                    {text: 'Progressive', value: 'progressive'}
                ]}
                onChange={(event, {value}) => {setPerspective(value); setInput("Explain in " + manner + " terms as if you were talking with a student from " + level + " how " + value + "s view " + topic + ".")}}
                />
                <Header as='h3' content='🖋 Topic 🖋' />
                <Dropdown
                defaultValue='climate change'
                fluid
                selection
                options={[
                    {text: 'Climate Change', value: 'climate change'}, 
                    {text: 'Gun Control', value: 'gun control'}, 
                    {text: 'Universal Health Care', value: 'universal health care'}
                ]}
                onChange={(event, {value}) => {setTopic(value); setInput("Explain in " + manner + " terms as if you were talking with a student from " + level + " how " + perspective + "s view " + value + ".")}}
                />
                <Header as='h3' content='🎤 Manner 🎤' />
                <Dropdown
                defaultValue='casual'
                fluid
                selection
                options={[
                    {text: 'Casual', value: 'casual'}, 
                    {text: 'Formal', value: 'formal'}, 
                    {text: 'Fortnite', value: 'fortnite'}, 
                    {text: 'Minecraft', value: 'minecraft'}
                ]}
                onChange={(event, {value}) => {setManner(value); setInput("Explain in " + value + " terms as if you were talking with a student from " + level + " how " + perspective + "s view " + topic + ".")}}
                />
                <Header as='h3' content='🎓 Level 🎓' />
                <Dropdown
                defaultValue='elementary school'
                fluid
                selection
                options={[
                    {text: 'Elementary School', value: 'elementary school'}, 
                    {text: 'High School', value: 'high school'}, 
                    {text: 'Graduate School', value: 'graduate school'}
                ]}
                onChange={(event, {value}) => {setLevel(value); setInput("Explain in " + manner + " terms as if you were talking with a student from " + value + " how " + perspective + "s view " + topic + ".")}}
                />
                <Button type='submit' style={{margin: "1rem 0rem 0rem 0rem"}}>Submit</Button>
            </Form>
            {output ? <p>{output}</p> : null}
        </Container>
    );
}

export default Democrasee;
