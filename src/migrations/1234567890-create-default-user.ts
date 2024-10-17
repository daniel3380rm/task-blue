import { Db } from 'mongodb';
import { Types } from 'mongoose';

export const up = async (db: Db) => {
  const defaultUserId = new Types.ObjectId();
  await db.collection('users').insertOne({
    _id: defaultUserId,
    name: 'Default User',
    email: 'default@example.com',
    createdAt: new Date(),
  });

  await db.collection('app_settings').insertOne({
    key: 'DEFAULT_USER_ID',
    value: defaultUserId.toHexString(),
  });
};

export const down = async (db: Db) => {
  const appSettings = await db
    .collection('app_settings')
    .findOne({ key: 'DEFAULT_USER_ID' });
  if (appSettings) {
    await db
      .collection('users')
      .deleteOne({ _id: new Types.ObjectId(appSettings.value) });
    await db.collection('app_settings').deleteOne({ key: 'DEFAULT_USER_ID' });
  }
};
