// Get Value 
let post_add_form = document.getElementById('post_add_form');
let measage_alert = document.querySelector('.measage_alert');
let user_ig_post = document.querySelector('.user_ig_post');
let post_edit_form = document.getElementById('post_edit_form');




// Submit Form 
post_add_form.onsubmit = (e)=>{
    e.preventDefault();

    // Get Form Value 
    let frm_val = new FormData(e.target);
    let data= Object.fromEntries(frm_val.entries());
    let {uname, uimage, pcontent, pimage} = Object.fromEntries(frm_val.entries())
   
    
  
    if(!uname || !uimage || !pcontent || !pimage){

        measage_alert.innerHTML = alertFuntion('All Fildes Are Required');
        setTimeout(()=>{
            measage_alert.innerHTML = '';
        }, 1000)

    }else{

        SetLsData('ig_post', data)
        measage_alert.innerHTML = alertFuntion('Post Create Success', 'success');
        setTimeout(()=>{
            measage_alert.innerHTML = '';
        }, 1000)
        e.target.reset();
        showData();

    }

}


// Show Data 
const showData = ()=>{

    // Receive Ls Data 
    let receiveAllData = getLsData('ig_post');
    
    let post_list = '';
    // Check and Show Data 
    if(!receiveAllData || receiveAllData ==0){

        post_list = `
        
            <div class="card mt-4">
                <div class="card-body text-center">
                    <h5>No Post Found</h5>
                </div>
            </div>
        
        `;

    }

    if(receiveAllData){

        receiveAllData.map((item, index)=>{
            post_list += `
                    <div class="card mt-4">
                    <div class="card-body">
                    
                        <div class="user-top-info">
                            <div class="user-top-info-left">
                                <div class="profile-img">
                                    <a href=""><img src="${item.uimage}" alt=""></a>
                                </div>
                                <div class="profile-text">
                                    <h6>${item.uname}</h6>
                                </div>
                            </div>
                            <div class="user-top-info-right">
                                <div class="dropdown">
                                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                    </a>

                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item post_edit" href="#post_edit_modal" post_index="${index}" data-bs-toggle="modal">Edit</a></li>
                                        <li><a class="dropdown-item delete_post" post_index="${index}" href="#">Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <img class="w-100" src="${item.pimage}" alt="">
                    <div class="post_bottom">

                    <div class="post_btm_top">

                        <div class="post_btm_top_left">
                            <ul>
                                <li><a href=""><svg aria-label="Like" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg></a></li>
                                <li><a href=""><svg aria-label="Comment" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg></a></li>
                                <li><a href=""><svg aria-label="Share Post" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg></a></li>
                            </ul>
                        </div>
                        <div class="post_btm_top_right">
                            <a href=""><svg aria-label="Save" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg></a>
                        </div>

                    </div>
                    <div class="post_btm_ft">
                        <h6>Liked by saadi_hammad and othres</h6>
                        <p> <span style="font-weight: bold; cursor: pointer;">${item.uname}</span> ${item.pcontent}</p>
                    </div>

                    </div>
                </div>
            `;
        })
    }



    user_ig_post.innerHTML = post_list;

}
showData();


// Edit Data 
user_ig_post.onclick =(e)=>{
    
    // Get Post Index 
    if(e.target.classList.contains('post_edit')){

        let post_index = e.target.getAttribute('post_index')
        let dataLs = getLsData('ig_post')
        let {uimage, uname, pcontent, pimage} = dataLs[post_index]

        post_edit_form.innerHTML = `
        
                <div class="my-2">
                <label for="">User Name</label>
                <input type="text" value="${uname}" name="uname" class="form-control">
            </div>
            <div class="my-2">
                <label for="">User Image</label>
                <input type="text" value="${uimage}" name="uimage" class="form-control">
            </div>
            <div class="my-2">
                <input type="hidden" value="${post_index}" name="post_index" class="form-control">
            </div>
            <div class="my-2">
                <label for="">Post Image</label>
                <input type="text" value="${pimage}" name="pimage" class="form-control">
            </div>
            <div class="my-2">
                <label for="">Post Content</label>
                <textarea name="pcontent" class="form-control">${pcontent}</textarea>
            </div>
            <div class="my-2">
                <button class="btn btn-primary w-100">Create Post</button>
            </div>
        `;

    }

    // Post Delete 
    if(e.target.classList.contains('delete_post')){

        let per_user = confirm('Are You Sure ...?')
        if(per_user){
            let post_index = e.target.getAttribute('post_index');
            let dataLsAll = getLsData('ig_post');
            dataLsAll.splice(post_index, 1);
            updateLsData('ig_post', dataLsAll);
            showData();
        }else{
            alert('Your Post Safe')
        }

      

    }


}


// Update Data 
post_edit_form.onsubmit = (e)=>{
    e.preventDefault();

    // get Form Val 
    let edt_frm_val  = new FormData(e.target);
    let {uname, uimage, pcontent, pimage, post_index} = Object.fromEntries(edt_frm_val.entries());

    // Get Ls Data 
    let dataLs = getLsData('ig_post');
    dataLs[post_index] = {uname, uimage, pcontent, pimage};

    // Mow UpDate Ls Data 
    updateLsData('ig_post', dataLs);
    showData()

}