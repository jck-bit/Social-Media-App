import styled from 'styled-components';

export const Container = styled.div`
  width:fit-content;
  padding:20px;
  display:flex;
  height:100%;
  margin:50px 200px;
  color:white;
  background-color:black;
  border-radius:1%;
`

export const Right =styled.div`
   flex:2
  align-items:center;
  border-right:1px solid  rgb(114, 110, 104);
  padding-top: 30px;
  position:sticky;
`

export const Logo =styled.div`
  align-items:center;
  display:flex;
  
`

export const Image = styled.img`
  width:50px;
  height:50px;
  border-radius:50%;
  object-fit:cover;
  cursor:pointer;
  margin-left:20px;
` 

export const Second = styled.div`
  padding:20px 100px 0;
  margin-bottom:10px;
`

export const Sylvia = styled.img`
  height:50px;
  width:50px;
  border-radius:50%;
  object-fit:cover;
  
`
export const Third = styled.p`
  display:flex;
  margin-left: 20px;
`

export const Fourth = styled.div`
  padding-right:0.5rem;  
`

export const Fifth = styled.div`
 margin:20px 10px;
 align-items:center;
 display:flex;
 
 &:hover{
  cursor:pointer;
  opacity:0.9;
  transform:scale(0.99)
}`

export const Major = styled.div`
  margin-top:2rem;
  display:inline-block;
`