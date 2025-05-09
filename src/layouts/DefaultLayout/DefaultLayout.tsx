import styles from './DefaultLayout.module.scss';
import { Flex } from 'antd';
import DefaultRoutes from '@/routes/DefaultRoutes';

const DefaultLayout = () => {
    return (
        <Flex justify='center' align='center' className={styles.container}>
            <div className={styles.form}>
                <DefaultRoutes/>
            </div>
        </Flex>
    )
}
export default DefaultLayout;