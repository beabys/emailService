
#####Go Example

    package main
    
    import (
        "fmt"
        "strings"
        "net/http"
        "io/ioutil"
    )
    
    func main() {
    
        url := "http://host_to_request/mail"
    
        payload := strings.NewReader("{\n        \"subject\" : \"subject\",\n        \"content\" : \"message content\",\n        \"receiver_name\" : \"receiver name\",\n        \"receiver_email\" : \"some@email.com\"\n}")
    
        req, _ := http.NewRequest("POST", url, payload)
    
        req.Header.Add("content-type", "application/json")
        req.Header.Add("authorization", "Basic <user:password base64 encode>")
    
        res, _ := http.DefaultClient.Do(req)
    
        defer res.Body.Close()
        body, _ := ioutil.ReadAll(res.Body)
    
        fmt.Println(res)
        fmt.Println(string(body))
    
    }