const input = document.querySelector("#tasks");
const add = document.querySelector("#addbutton");
const list = document.querySelector("#list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
refresh();

add.addEventListener('click',() => {

    addContent();

    input.value='';

    
})

function addContent()
{
    const taskText = input.value.trim();
    if(taskText==='')return;
    
    const id = Date.now();
    tasks.push({
        id : id,
        text: taskText,
        finish: false
    });
    
    const task = document.createElement('li');
    task.dataset.id=id;
    addText(task,taskText);
    addButton(task);
    show(task);
    save();


}

function addText(li,text)
{
    li.textContent = text;
}
function addButton(li)
{
    const FinishButton = document.createElement('button');
    const DeletButton = document.createElement('button');
    FinishButton.className="FinishButton";
    DeletButton.className="DeletButton";
    FinishButton.textContent="完成";
    DeletButton.textContent="删除";
    li.append(FinishButton);
    li.append(DeletButton);
    FinishButton.addEventListener('click',()=>
    {
        li.classList.add("Finish-text");
        FinishButton.remove();
        tasks.forEach((item)=>{
            if(item.id===Number(li.dataset.id))
            {
                item.finish=true;
                save();
            }
        })       
    })
    DeletButton.addEventListener('click',()=>
    {
        tasks=tasks.filter((item)=>{
            return item.id !== Number(li.dataset.id);
        });
        li.remove();
        save();

    })
} 
function show(li)
{
    list.append(li);
}

function refresh()
{
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id=task.id;
        addText(li,task.text);
        addButton(li);
        if(task.finish===true)
        {
            li.classList.add("Finish-text");
        }
        show(li);
    });
}

function save()
{
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

