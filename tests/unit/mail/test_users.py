# -*- coding: utf-8 -*-
#
# This file is part of CERN Analysis Preservation Framework.
# Copyright (C) 2020 CERN.
#
# CERN Analysis Preservation Framework is free software; you can redistribute
# it and/or modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# CERN Analysis Preservation Framework is distributed in the hope that it will
# be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with CERN Analysis Preservation Framework; if not, write to the
# Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
# MA 02111-1307, USA.
#
# In applying this license, CERN does not
# waive the privileges and immunities granted to it by virtue of its status
# as an Intergovernmental Organization or submit itself to any jurisdiction.
"""Tests for mail."""

from cap.modules.mail.users import get_all_users, get_users_by_record


def test_get_all_user_mails(users):
    users = get_all_users()

    assert len(users) == 9
    for experiment in ['atlas', 'cms', 'lhcb', 'alice']:
        assert len([
            user for user in users
            if user.startswith(experiment)
        ]) == 2


def test_get_users_by_record(app, db, users, create_deposit):
    user1 = users['alice_user']
    user2 = users['alice_user2']

    deposit = create_deposit(user1, 'alice-analysis-v0.0.1')
    deposit._add_user_permissions(
        user2,
        ['deposit-read'],
        db.session
    )
    depid = deposit['_deposit']['id']

    users_all = get_users_by_record(depid)
    assert len(users_all) == 2

    users_admin = get_users_by_record(depid, role='admin')
    assert len(users_admin) == 1

    users_read = get_users_by_record(depid, role='read')
    assert len(users_read) == 2



