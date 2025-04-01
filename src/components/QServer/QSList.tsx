import { useEffect, useRef, useState } from 'react';
import QItem from './QItem';
import dayjs from 'dayjs';
import './styles/qserver.css'; 

type QSListProps = {
    queueData: any[];
    handleQItemClick: (arg: any, showDeleteButton: boolean) => void;
    type: 'default' | 'history' | 'short';
};
export default function QSList({ queueData=[], handleQItemClick=()=>{}, type='default' }: QSListProps) {
    const [visibleItems, setVisibleItems] = useState(4); // Start with 10 items
    const listRef = useRef<HTMLUListElement | null>(null);

    const loadMoreItems = () => {
        setVisibleItems((prev) => prev + 10); // Load 10 more items
    };

    const handleScroll = () => {
        console.log('scroll')
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            console.log({scrollTop, scrollHeight, clientHeight})
            if (scrollTop + clientHeight >= scrollHeight - 2) {
                loadMoreItems(); // Load more items when the user scrolls to the bottom
            }
        }
    };

    useEffect(() => {
        const scrollToTop = () => {
            if (listRef.current) {
                listRef.current.scrollTop = -listRef.current.scrollHeight; // Scroll to the top
            }
        };

        // Using setTimeout to ensure the DOM has fully rendered
        const timeoutId = setTimeout(scrollToTop, 0);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [queueData]);

    useEffect(() => {
        if (type === 'history') {
            if (listRef.current) {
                console.log('adding scroll event listener')
                listRef.current.addEventListener('scroll', handleScroll);
            }
        }
        return () => {
            if (listRef.current) {
                console.log('removing scroll event listener')
                listRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [])

    if (type === 'default') {
        return (
            <section className="">
                <h2 className="text-white text-xl text-center">Queue Items</h2>
                <ul className="flex flex-row-reverse mt-2 justify-evenly overflow-auto scrollbar-always-visible">
                    {queueData.map((item, index) => <QItem type="current" item={item} label={index.toString()} key={item.item_uid} handleClick={()=>handleQItemClick(item, true)}/>)}
                    {queueData.length < 6 ? [...new Array(6 - queueData.length)].map((item, index) => <QItem type='blank' item={item} key={index}/>) : '' }
                </ul>
            </section>
        );
    } else if (type === 'history') {
        const showDeleteButton = false;
        return (
            <section className="w-full flex flex-col ">
                <ul ref={listRef} className="flex flex-wrap-reverse justify-center border border-red-500">
                    {queueData.slice(0, visibleItems).map((item, index) => 
                        <QItem type="history" item={item} label={dayjs(item.result.time_stop * 1000).format('MM/DD hh:mm a')} key={item.item_uid} handleClick={()=>handleQItemClick(item, showDeleteButton)}/>
                    )}
                </ul>
            </section>
        )
    } else if (type === 'short') {
        return (
            <section className="w-full">
                <ul className="flex flex-wrap-reverse justify-center items-end">
                    {queueData.map((item, index) => <QItem type="current" item={item} label={index.toString()} key={item.item_uid} handleClick={()=>handleQItemClick(item, true)}/>)}
                    {queueData.length < 0 ? [...new Array(0 - queueData.length)].map((item, index) => <QItem type="blank" item={item} key={index}/>) : '' }
                    <QItem type="blank" item={false}/>
                </ul>
            </section>
        );
    }
}