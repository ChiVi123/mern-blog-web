import { Button, Select, TextInput } from 'flowbite-react';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PostCard } from '~components';
import { IPostEntity, postListRepo } from '~modules/post';

function SearchPage() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });
    const [posts, setPosts] = useState<IPostEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('search_term') || '';
        const sortFromUrl = urlParams.get('sort') || 'desc';
        const categoryFromUrl = urlParams.get('category') || 'uncategorized';
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData((prev) => ({
                ...prev,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            }));
        }

        (async () => {
            setLoading(true);
            const result = await postListRepo({
                search_term: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            });
            if ('success' in result) {
                setLoading(false);
                return;
            }
            setPosts(result.posts);
            setLoading(false);
            if (result.posts.length === 10) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        })();
    }, [location.search]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('search_term', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate({ pathname: '/search', search: searchQuery });
    };
    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'category') {
            const category = e.target.value || 'uncategorized';
            setSidebarData({ ...sidebarData, category });
        }
    };
    const handleShowMore = async () => {
        const result = await postListRepo({
            start_index: posts.length,
        });
        if ('success' in result) {
            return;
        }
        setPosts([...posts, ...result.posts]);
        if (result.posts.length === 10) {
            setShowMore(true);
        } else {
            setShowMore(false);
        }
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex   items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <TextInput
                            placeholder='Search...'
                            id='searchTerm'
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Category:</label>
                        <Select onChange={handleChange} value={sidebarData.category} id='category'>
                            <option value='uncategorized'>Select a category</option>
                            <option value='javascript'>JavaScript</option>
                            <option value='typescript'>Typescript</option>
                            <option value='reactjs'>React.js</option>
                            <option value='reactjs-ts'>React.js with Typescript</option>
                            <option value='nextjs'>Next.js</option>
                            <option value='nextjs-ts'>React.js with Typescript</option>
                        </Select>
                    </div>
                    <Button type='submit' outline gradientDuoTone='purpleToPink'>
                        Apply Filters
                    </Button>
                </form>
            </div>
            <div className='w-full'>
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>Posts results:</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && posts.length === 0 && <p className='text-xl text-gray-500'>No posts found.</p>}
                    {loading && <p className='text-xl text-gray-500'>Loading...</p>}
                    {!loading && posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
                    {showMore && (
                        <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'>
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
