import axios from 'axios';
const format = require('date-fns/format');

const getAPI = async () => {
	try {
		const response = await axios.get(
			'http://insights.canonicalwebteam.com/wp-json/wp/v2/posts?per_page=3&page=1&_embed=True'
		);
		console.log('Response', response);
		console.log('Data', response.data);

		const data = response.data;

		let render = '';

		data.map(wp => {
			const date = format(new Date(wp.date), 'DD MMMM YYYY');

			render += `
            <div class="p-card--highlighted card-border--top col-4">
					<div class="post-info--heading">
						<h3>Cloud and Server</h3>
						<hr />
					</div>
					<div><img src="https://i.ytimg.com/vi/SczQEopiWmE/maxresdefault.jpg" alt="Post Image" /></div>
					<div class="post-info">
						<h2><a href="#">${wp.title.rendered}</a></h2>
						<p>By <a href="#">${wp._embedded.author[0].name}</a> on ${date}</p>
					</div>
					<div class="p-card--footer">
						<hr />
						<p>Article</p>
					</div>
				</div>
            `;
		});

		document.querySelector('.list').innerHTML = render;
	} catch (error) {
		console.log(error);
	}
};
getAPI();
