import React from 'react'
import { Button,Label,
Input } from 'reactstrap';

export const Filter = ({value, handleChange,handleRefresh}) => {
return (
<div>
<Input
type='text'
name='search'
id='search'
placeholder='Search with Name or Email'
value={value} 
onChange={handleChange}
style={{
backgroundColor: 'lightblue',
borderRadius: 50
}}
/>
<br/>
<Button
onClick={handleRefresh}
className="btn btn-success"
style={{
align: 'right'
}}
>Refresh</Button>
</div>
);
};
