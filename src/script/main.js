
var editor = null;
var el = {};
var lastCheck = 0;

function encrypt(_string, _key){

    return CryptoJS.AES.encrypt(_string, _key).toString();
}

function decrypt(_string, _key){

    var bytes     = CryptoJS.AES.decrypt(_string, _key);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);

    return plaintext;
}

function setEditorContent(_json){

    if (!editor) return;

    if (typeof _json === 'string') 
        _json = JSON.parse(_json);

    editor.set(_json);
}

function loadJSON(){

    var content = {};

    if (el.auth.dataset.mode === 'login'){
        var key = getCurrentKey();
        
        if (!checkKey(key)) return;

        content = decrypt(getJSON(), key);
    }
    else
    if (el.auth.dataset.mode === 'new'){
        if (el.keygen.value !== el.rekeygen.value){
            return;
        }
    }
    else return;

    el.auth.style.display       = 'none';
    el.toolbar.style.display    = 'block';
    el.container.style.display  = 'block';

    setEditorContent(content);
    
    // session check
    lastCheck = Date.now();
    setInterval(checkSession, 250);
}

function saveJSON(){
    
    var key = getCurrentKey();
    var JSONString = editor.getText();

    if (!checkKey(key)) return;

    var encrypredJSON = encrypt(JSONString, key);

    var formData = new FormData();
        formData.append('json', encrypredJSON);

    fetch("src/include/save.php", {
        method: "POST",
        mode: "same-origin",
        body: formData
    })
    .then(function(_res){ 
        return _res.text(); 
    })
    .then(function(_res){ 
        if (_res !== 'OK') 
            alert('Save failed!');
        else{
            setJSON(encrypredJSON);
            alert('Saved!');
        }
    })

    // save

    console.log({
        json: JSONString,
        encrypted: encrypt(JSONString, key),
        key: key
    });
}

function getJSON(){
    return typeof json === 'string' ? json : null;
}

function setJSON( _json){
    window.json = _json;
}

function getCurrentKey(){

    return el.keygen.value; 
}

function checkKey(_key) {

    try{
        var JSONString = decrypt(getJSON(), _key);

        JSON.parse(JSONString);
        return true;
    }
    catch(_er){
        return false;
    }
}

function checkSession(){

    var time  = 1000 *60; // 5 min
    var tLeft = lastCheck + time - Date.now();

    var tS = tLeft / 1000; 
    
    el.session.textContent = tS|0; //tM +':'+ tS; //tLeft | 0;
    
    if (tLeft <= 0){  // 5 min
        document.body.dataset.expired = true;
        location.reload();
    }
}

function init(){
    
    // do not initialize twice
    if (editor) return;

    // references
    el = {
        container:  document.querySelector("#jsoneditor"),
        auth:       document.querySelector('#auth'),
        toolbar:    document.querySelector('#toolbar'),
        keygen:     document.querySelector('#auth input:first-child'),
        rekeygen:   document.querySelector('#auth input:last-child'),
        btnSave:    document.querySelector('#auth button[data-name="btn-save"]'),
        session:    document.querySelector('#toolbar .session-time')
    };

    // define login mode
    if (!getJSON()){
        setJSON('');
        el.auth.dataset.mode = 'new';
    }
    else{
        el.auth.dataset.mode = 'login';
    }

    // editor
    editor = new JSONEditor(el.container, {mode:"code", modes:["tree", "view", "code", "text"] });
    
    // focus
    setTimeout(function(){
        el.auth.click();
        el.keygen.focus();
    }, 500);

    // events
    window.addEventListener('click', function(_e){
        
        var target = _e.target;
        switch(target.dataset.name){
    
            case 'auth-background': 
                el.keygen.focus();
                break;

            case 'btn-save': 
                saveJSON();
                break;
            
        }

        lastCheck = Date.now();
    });
    window.addEventListener('keydown', function(_e){
    
        var target = _e.target;
        switch(target.dataset.name){
    
            case 'inp-keygen': 
                if (_e.keyCode === 13)
                    loadJSON();
                break;
            
        }

        lastCheck = Date.now();
    });
}

init();
