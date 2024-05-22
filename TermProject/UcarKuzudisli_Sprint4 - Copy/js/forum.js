$(document).ready(function(){
    var offset = 250;
    var duration = 500;

    $(window).scroll(function(){
        if($(this).scrollTop() > offset){
            $('.to-top').fadeIn(duration);
        }else{
            $('.to-top').fadeOut(duration);
        }
    });

    $('.to-top').click(function(){
        $('body').animate({scrollTop: 0}, duration);
        // Fetch forum data with the current selected items per page value
        const itemsPerPage = document.getElementById('itemsPerPageDropdown').value;
        fetchForumData(1, itemsPerPage); // Reload forum data with page number 1
    });
})


// Function to fetch forum data via AJAX
function fetchForumData(pageNumber = 1, itemsPerPage = 10) {
    const url = `json/forums.json`; // 
    const startIndex = (pageNumber - 1) * itemsPerPage;

    // Fetch data from the JSON file
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Clear existing content
            document.getElementById('forums').innerHTML = '';

            // Slice the data to get the portion for the current page
            const pageData = data.slice(startIndex, startIndex + itemsPerPage);

            // Iterate over the page data and generate HTML elements
            pageData.forEach(forum => {
                const forumHTML = `
                    <div class="forum">
                        <div class="foruminteraction">
                            <p>${forum.votes}</p>
                            <p id="answer">
                            <span><svg id="SvgjsSvg1161" width="30" height="30" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1162"></defs><g id="SvgjsG1163"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="35" height="35"><defs><linearGradient id="a" x1="4.5" x2="27.5" y1="16" y2="16" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff6699" class="stopColor15ffee svgShape"></stop><stop offset="1" stop-color="#d873d5" class="stopColor73c3ff svgShape"></stop></linearGradient><linearGradient id="b" x1="11.1" x2="20.9" xlink:href="#a"></linearGradient></defs><g data-name="Layer 46"><path fill="url(#a)" d="M16,4.5A11.5,11.5,0,1,0,27.5,16,11.5131,11.5131,0,0,0,16,4.5Zm0,22A10.5,10.5,0,1,1,26.5,16,10.5118,10.5118,0,0,1,16,26.5Z"></path><path fill="url(#b)" d="M20.0156,12.38l-5.1494,6.18-2.9126-2.9131a.5.5,0,0,0-.707.707l3.3,3.3A.5.5,0,0,0,14.9,19.8l.0225-.001a.5.5,0,0,0,.3618-.1787l5.5-6.6a.5.5,0,0,0-.7686-.6406Z"></path></g></svg></g></svg></span>
                            <span>${forum.answers}</span>
                            </p>
                            <p>${forum.views}</p>
                        </div>
                        <div>
                            <div class="forumtitle">
                                <h3>${forum.title}</h3>
                            </div>
                            <div class="forumentry">
                                <p>${forum.entry}</p>
                            </div>
                            <div class="foruminfo">
                                <div class="tags">
                                    ${forum.tags.map(tag => `<p>${tag}</p>`).join('')}
                                </div>
                                <div class="info">
                                    <p>${forum.info.author}</p>
                                    <p>${forum.info.asked}</p>
                                    <p>${forum.info.active}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById('forums').innerHTML += forumHTML;
            });

            // pagination
            const totalPages = Math.ceil(data.length / itemsPerPage);
            const paginationHTML = `
                <div class="pagination">
                    ${Array.from({ length: totalPages }, (_, i) => `<a href="#" onclick="fetchForumData(${i + 1}, ${itemsPerPage})">${i + 1}</a>`).join('')}
                </div>
            `;
            document.getElementById('pagination').innerHTML = paginationHTML;

            // dropdown for selecting items per page
            const itemsPerPageDropdownHTML = `
                <select id="itemsPerPageDropdown" onchange="fetchForumData(1, this.value)">
                    <option value="5">5 per page</option>
                    <option value="7">7 per page</option>
                    <option value="10">10 per page</option>
                </select>
            `;
            document.getElementById('itemsPerPageDropdownContainer').innerHTML = itemsPerPageDropdownHTML;
            document.getElementById('itemsPerPageDropdown').value = itemsPerPage;
        })
        .catch(error => console.error('Error fetching forum data:', error));
}

// Initial call to fetch forum data
fetchForumData();



