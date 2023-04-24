import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { deleteUrl, getUrlDataList, saveUrlData } from "../network";
import { Delete  } from "@mui/icons-material";
const UrlShortner = () => {
    const [urlData, setUrlList] = useState([])
    const [longUrl, setLongUrl] = useState('')

    const onTextChange = (event) => {
        setLongUrl(event.target.value)
    }
    
    const getUrlList = () => {
         getUrlDataList().then((urlList) => {
            if(urlList.status) {
                setUrlList(urlList.resultData)
            } else {
                setUrlList([])
            }
        });
    }

    useEffect(() => {
       getUrlList();
    }, [])

    const onGetShortUrl = () => {
        saveUrlData(longUrl).then((addUrlInfo) => {
            if(addUrlInfo.status){
                setUrlList(oldList => [...oldList, {...addUrlInfo.result}])
            } else {
                alert(addUrlInfo.message)
            }
        })
    }

    const onDeleteURL = (event, urlId) => {
        deleteUrl(urlId).then((urlList) => {
            if(urlList.status) {
                setUrlList(urlList.resultData)
            } else {
                alert(urlList.message)
            }
        })
    }
    return (
        <Grid container>
            <Grid item width={'100%'}>
                <TextField rows={3} label="multiline" style={{width:'50%'}} onChange={onTextChange} multiline ></TextField>
                <Button variant="contained" style={{marginLeft: '11px', top: '25%'}} onClick={onGetShortUrl}>Short</Button>
            </Grid>
            <Grid item width={'100%'}>    
                <List>
                    {
                        urlData.map(item => {
                            return (
                                <ListItem secondaryAction ={
                                    <IconButton edge="end" aria-label="delete" onClick={(event) => onDeleteURL(event,item.urlId)}>
                                    <Delete/>
                                    </IconButton>
                                }>
                                <ListItemAvatar>
                                <Avatar>
                                    {item.clicks}
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={item.longUrl}
                                    secondary={item.shortUrl}
                                />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Grid>
        </Grid>
    ) 
}

export default UrlShortner;